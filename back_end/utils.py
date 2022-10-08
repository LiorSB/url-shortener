import hashlib


BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'


def encode_b62(number: int) -> str:
    """
    Encode a positive number into Base X and return the string.

    Args:
        number (int): The number to encode.

    Returns:
        str: Encoded string in base 62
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
    """
    Generate a hash from a string to a given length.

    Args:
        string (str): The string to hash.
        hash_length (int, optional): The length of the hash.
            Defaults to 6.

    Returns:
        str: Hashed string.
    """
    string_md5 = hashlib.md5(string.encode()).digest()
    string_int = int.from_bytes(string_md5, byteorder='little')
    string_b62 = encode_b62(string_int)
    string_hash = string_b62[:hash_length]

    return string_hash
