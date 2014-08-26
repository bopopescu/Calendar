from datetime import datetime, date


def get_holidays(datelist): # input type [[yy, mm, dd], [yy, mm, dd]]

    holidays = []

    for item in datelist:
        day = date(item[0], item[1], item[2])
        holidays.append(day)

    return holidays # [datetime.date(yy, mm, dd)]

def get_weekday(item): # input type: [yy, mm, dd]

    d = date(item[0], item[1], item[2])
    check = 0

    if d.weekday() == 5: # Saturday 
        check = 1
    elif d.weekday() == 6: # Sunday
        check = 2
    else: # weekdays
        check = 3 

    return check # 0: error, 1: Saturday, 2: Sunday, 3: Weekday


holiday_list = [[2014, 3, 21], [2014, 8, 15], [2014, 12, 25], [2014, 8, 24]] # [yy, mm, dd] from database

holidays = get_holidays(holiday_list)

print holidays[0].isoformat()

for item in holiday_list:
    print get_weekday(item)
