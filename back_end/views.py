from datetime import datetime, timedelta
from http import HTTPStatus
from urllib.parse import urljoin
import validators
from flask import request, make_response, redirect, jsonify, Response
from .utils import hash_to_specified_length
from .app import app, url_collection, cache


MAX_URL_LENGTH = 2048
BASE_URL = 'http://127.0.0.1:5000'


@app.get('/shorten')
def shorten_url() -> Response:
    request_body = request.json

    if not request_body:
        return make_response(
            jsonify({
                'error': 'No valid JSON data has been received.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    if 'url' not in request_body:
        return make_response(
            jsonify({
                'error': 'URL key is missing from JSON data.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    url = request_body['url']

    if not url.startswith('http://') and not url.startswith('https://'):
        url = f'http://{url}'

    if not validators.url(url):
        return make_response(
            jsonify({
                'error': 'The URL is invalid.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    if len(url) > MAX_URL_LENGTH:
        return make_response(
            jsonify({
                'error': f'The URL is too long, max number of characters is: {MAX_URL_LENGTH}'
            }),
            HTTPStatus.BAD_REQUEST
        )

    counter: int = 0
    current_time = datetime.now()
    url_hash = hash_to_specified_length(url)

    while url_dictionary := url_collection.find_one({'_id': url_hash}):
        expiration_date = datetime.fromisoformat(url_dictionary['expiration_date'])

        if current_time >= expiration_date:
            url_collection.delete_one(url_dictionary)
            break

        url_hash = hash_to_specified_length(f'{url}{counter}')
        counter += 1

    expiration_date = current_time + timedelta(days=365*5)

    url_dictionary = {
        '_id': url_hash,
        'original_url': url,
        'creation_date': current_time.isoformat(),
        'expiration_date': expiration_date.isoformat(),
    }

    url_collection.insert_one(url_dictionary)

    return make_response(
        jsonify({
            'short_url': urljoin(BASE_URL, url_hash)
        }),
        HTTPStatus.OK
    )


@app.get('/<suffix_hash>')
def redirect_url(suffix_hash: str) -> Response:
    # In case the url exists in the cache.
    if url := cache.get(suffix_hash):
        return redirect(
            url,
            code=HTTPStatus.FOUND
        )

    # In case the suffix_hash doesn't exist in the DB, return 404 message.
    if not (url_dictionary := url_collection.find_one({'_id': suffix_hash})):
        return make_response(
            jsonify({
                'error': 'Unable to find URL to redirect to.'
            }),
            HTTPStatus.NOT_FOUND
        )

    expiration_date = datetime.fromisoformat(url_dictionary['expiration_date'])
    current_time = datetime.now()

    # In case the URL has expired, return 410 message.
    if current_time >= expiration_date:
        url_collection.delete_one(url_dictionary)

        return make_response(
            jsonify({
                'error': 'The shortened URL has expired.'
            }),
            HTTPStatus.GONE
        )

    url = url_dictionary['original_url']
    cache.set(suffix_hash, url)

    return redirect(
        url,
        code=HTTPStatus.FOUND
    )
