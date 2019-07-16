import datetime


def parseDate(input_str):
    formats = [
        '%d %B %Y',
        '%d %b %Y',
        '%Y-%m-%d',
        '%d-%m-%Y',
        '%d/%m/%Y',
    ]
    for fmt in formats:
        try:
            return datetime.datetime.strptime(date_str, fmt)
        except:
            pass
    return None

parsed_date = None

while parsed_date is None:
    date_str = input('When were you born? ')
    if date_str == 'exit':
        # TODO: Improve this
        break
    # date_str = '27 June 1996'
    parsed_date = parseDate(date_str);
    if (parsed_date is None):
        print('That\'s not a valid date!')


month = parsed_date.month
day = parsed_date.day
print('Your day is', day, 'and your month is', month) # TODO: Remove
print('Tell me about yourself!')

run_loop = True
while run_loop:
    user_input = input('> ')
    if user_input == 'exit':
        print('Bye!')
        run_loop = False
    else:
        # TODO: "YOu're such a ____"
        print('Wow!')

