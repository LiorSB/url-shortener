from datetime import datetime, timedelta
from http import HTTPStatus
from urllib.parse import urljoin
import validators
from flask import request, make_response, redirect, jsonify, Response
from .utils import hash_to_specified_length
from .app import app, url_collection, user_collection, cache


MAX_URL_LENGTH = 2048
YEAR_IN_DAYS = 365
REGULAR_YEARS_TILL_EXPIRED = 5*YEAR_IN_DAYS
PREMIUM_YEARS_TILL_EXPIRED = 7*YEAR_IN_DAYS
BASE_URL = 'http://127.0.0.1'


@app.post('/shorten')
@app.post('/shorten/<user_id>')
def shorten_url(user_id: str = None) -> Response:
    """
    Generate a short URL from the original one and save it in the DB.

    Args:
        user_id (str, optional): ID of the logged in user.
            Defaults to None.

    Returns:
        Response: In case of success the generated short URL is returned, else a failure message.
    """
    request_body = request.json

    # In case of no body.
    if not request_body:
        return make_response(
            jsonify({
                'error': 'No valid JSON data has been received.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    # In case there is no URL in the body.
    if not (url := request_body.get('url')):
        return make_response(
            jsonify({
                'error': 'url key is missing from JSON data.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    if not url.startswith('http://') and not url.startswith('https://'):
        url = f'http://{url}'

    # Validate the URL.
    if not validators.url(url):
        return make_response(
            jsonify({
                'error': 'The URL is invalid.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    # Check if the Length of the URL is valid.
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

    # Generate a hash for the short URL until there is one that doesn't exist in the DB.
    # Keep append +1 till success.
    while url_dictionary := url_collection.find_one({'_id': url_hash}):
        expiration_date = datetime.fromisoformat(url_dictionary['expiration_date'])

        # In case a URL already exists, but it has already expired delete it and break the loop.
        if current_time >= expiration_date:
            url_collection.delete_one(url_dictionary)
            break

        url_hash = hash_to_specified_length(f'{url}{counter}')
        counter += 1

    years_till_expired = PREMIUM_YEARS_TILL_EXPIRED if user_id else REGULAR_YEARS_TILL_EXPIRED
    expiration_date = current_time + timedelta(days=years_till_expired)

    url_dictionary = {
        '_id': url_hash,
        'original_url': url,
        'creation_date': current_time.isoformat(),
        'expiration_date': expiration_date.isoformat(),
        'user_id': user_id
    }

    url_collection.insert_one(url_dictionary)

    return make_response(
        jsonify({
            'short_url': urljoin(BASE_URL, url_hash),
            'original_url': url,
            'creation_date': current_time.isoformat(),
            'expiration_date': expiration_date.isoformat()
        }),
        HTTPStatus.OK
    )


@app.get('/<suffix_hash>')
def redirect_url(suffix_hash: str) -> Response:
    """
    Redirect a short URL to its original URL.

    Args:
        suffix_hash (str): _id of the URL.

    Returns:
        Response: In case of success redirect to original URL, else failure message.
    """
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


@app.post('/sign_up')
def sign_up() -> Response:
    """
    Add a use to the DB.

    Returns:
        Response: Success or failure message according to the process.
    """
    request_body = request.json

    # In case of no body.
    if not request_body:
        return make_response(
            jsonify({
                'error': 'No valid JSON data has been received.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    # In case there is no email in the body.
    if not (email := request_body.get('email')):
        return make_response(
            jsonify({
                'error': 'email key is missing from JSON data.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    # In case there is no name in the body.
    if not (name := request_body.get('name')):
        return make_response(
            jsonify({
                'error': 'name key is missing from JSON data.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    # In case the email already exists in the DB.
    if user_collection.find_one({'email': email}):
        return make_response(
            jsonify({
                'error': 'This email has already signed up!'
            }),
            HTTPStatus.CONFLICT
        )

    user_dictionary = {
        'email': email,
        'name': name,
        'creation_date': datetime.now().isoformat()
    }

    user_id = user_collection.insert_one(user_dictionary)

    return make_response(
        jsonify({
            'user_id': str(user_id.inserted_id),
            'email': email,
            'name': name,
            'creation_date': user_dictionary['creation_date']
        }),
        HTTPStatus.OK
    )


@app.post('/log_in')
def log_in() -> Response:
    request_body = request.json

    # In case of no body.
    if not request_body:
        return make_response(
            jsonify({
                'error': 'No valid JSON data has been received.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    # In case there is no email in the body.
    if not (email := request_body.get('email')):
        return make_response(
            jsonify({
                'error': 'email key is missing from JSON data.'
            }),
            HTTPStatus.BAD_REQUEST
        )

    # In case the email already exists in the DB.
    if not (user_dictionary := user_collection.find_one({'email': email})):
        return make_response(
            jsonify({
                'error': 'The email does not exist'
            }),
            HTTPStatus.NOT_FOUND
        )

    return make_response(
        jsonify({
            'uer_id': str(user_dictionary['_id']),
            'name': user_dictionary['name'],
            'email': user_dictionary['email'],
            'creation_date': user_dictionary['creation_date'],
        }),
        HTTPStatus.OK
    )


@app.get('/shorten/<user_id>')
def get_user_urls(user_id: str = None) -> Response:
    """
    Get all short URLs generated by the user.

    Args:
        user_id (str, optional): ID of the user.
            Defaults to None.

    Returns:
        Response: In case of success all URLs created by the user, else failure message.
    """
    # Incase the user isn't logged in.
    if not user_id:
        return make_response(
            jsonify({
                'error': 'User not logged in!'
            }),
            HTTPStatus.FORBIDDEN
        )

    url_dictionaries = url_collection.find({'user_id': user_id})

    user_urls = [
        {
            'short_url': urljoin(BASE_URL, url_dictionary['_id']),
            'original_url': url_dictionary['original_url'],
            'creation_date': url_dictionary['creation_date'],
            'expiration_date': url_dictionary['expiration_date'],
        } for url_dictionary in url_dictionaries
    ]

    return make_response(
        jsonify({
            'url_data': user_urls
        }),
        HTTPStatus.OK
    )
