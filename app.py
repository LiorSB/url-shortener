import pymongo
from flask import Flask
from flask_caching import Cache


# MONGODB_HOST = 'mongodb://localhost:27017/'
MONGODB_HOST = 'mongodb://localhost:27117/'
DB_NAME = 'url_shortner'
COLLECTION_NAME = 'url'

app = Flask(__name__)

cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})

mongo_client: pymongo.MongoClient = pymongo.MongoClient(MONGODB_HOST)
mongo_client.admin.command('enableSharding', DB_NAME)
mongo_client.admin.command({
    'shardCollection': f'{DB_NAME}.{COLLECTION_NAME}',
    'key': {
        '_id': 'hashed'
    }
})
url_shortner_db = mongo_client[DB_NAME]
url_collection = url_shortner_db[COLLECTION_NAME]
