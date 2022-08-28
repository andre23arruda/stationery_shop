def validate_data(row: list) -> dict:
    '''Validate data'''
    row += [''] * 4
    row = row[:4]
    code, name, available_quantity, description = row
    is_valid = (
        len(code) > 0 and
        len(name) > 0 and
        available_quantity.isnumeric()
    )
    if is_valid:
        return {
            'code': code,
            'name': name,
            'available_quantity': available_quantity,
            'description': description,
        }
    raise ValueError('Invalid values')