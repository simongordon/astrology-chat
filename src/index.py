import datetime


def parseDate(input_str):
    formats = [
        '%d %B %Y',
        '%d %b %Y',
    ]
    for fmt in formats:
        try:
            return datetime.datetime.strptime(date_str, fmt)
        except:
            pass
    return None


date_str = input('When were you born? ')
# date_str = '27 June 1996'

parsed_date = parseDate(date_str);

if parsed_date is None:
    print('Invalid date!')
else:
    # print(dir(parsed_date))
    month = parsed_date.month
    day = parsed_date.day
    print('Your day is',day,'and your month is',month)

