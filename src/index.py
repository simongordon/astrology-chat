import datetime


def parseDate(input_str):
    formats = [
        '%d %B %Y',
        '%d %b %Y',
        '%Y-%m-%d',
        '%d-%m-%Y',
        '%d/%m/%Y',
        '%d %m %Y',
    ]
    for fmt in formats:
        try:
            return datetime.datetime.strptime(date_str, fmt)
        except:
            pass
    return None

class Thingo:
    def __init__(self, name, m1, d1, m2, d2):
        self.name = name
        self.d1 = d1
        self.m1 = m1
        self.d2 = d2
        self.m2 = m2

    def withinRange(self, day, month):
        return (day >= self.d1 and month == self.m1) or (day <= self.d2 and month == self.m2)


ranges = [
    Thingo('Aries', 3, 21, 5, 19),
    Thingo('Taurus', 4, 20, 5, 20),
    Thingo('Gemini', 5, 21, 6, 20),
    Thingo('Cancer', 6, 21, 7, 22),
    Thingo('Leo', 7, 23, 8, 22),
    Thingo('Virgo', 8, 23, 9, 22),
    Thingo('Libra', 9, 23, 10, 22),
    Thingo('Scorpio', 10, 23, 11, 21),
    Thingo('Sagittarius', 11, 22, 12, 21),
    Thingo('Capricorn', 12, 22, 1, 19),
    Thingo('Aquarius', 1, 20, 2, 18),
    Thingo('Pisces', 2, 19, 3, 20),
]



def getHoroscopeZodiacThing(day, month):
    for asdf in ranges:
        if asdf.withinRange(day, month):
            return asdf.name
    return None

parsed_date = None

while parsed_date is None:
    date_str = input('When were you born? ')
    if date_str == 'exit':
        # TODO: Improve this
        break
    parsed_date = parseDate(date_str);
    if (parsed_date is None):
        print('That\'s not a valid date!')


month = parsed_date.month
day = parsed_date.day
print('Your day is', day, 'and your month is', month) # TODO: Remove

thing = getHoroscopeZodiacThing(day, month)

if thing is None:
    print('Uh oh, can\'t find your sign!')

print('Tell me about yourself!')

run_loop = True
while run_loop:
    user_input = input('> ')
    if user_input == 'exit':
        print('Bye!')
        run_loop = False
    else:
        print('Wow, you\'re such a', thing)

