import hashlib


BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'


def encode_b62(number):
    """
    Encode a positive number into Base X and return the string.
    """
    if number == 0:
        return BASE62[0]

    array = []
    arr_append = array.append  # Extract bound-method for faster access.
    _divmod = divmod  # Access to locals is faster.
    base = len(BASE62)

    while number:
        number, rem = _divmod(number, base)
        arr_append(BASE62[rem])

    array.reverse()

    return ''.join(array)


def hash_to_specified_length(string: str, hash_length: int = 6) -> str:
    string_md5 = hashlib.md5(string.encode()).digest()
    string_int = int.from_bytes(string_md5, byteorder='little')
    string_b62 = encode_b62(string_int)
    string_hash = string_b62[:hash_length]

    return string_hash
