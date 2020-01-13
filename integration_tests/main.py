import requests
import json
from src.users import *
from src.myhttp import headers
from src.goals import *
from src.habits import *


def erase_database():
    print('Erasing data')
    r = requests.post('http://localhost:12404/app/better-you/hades')
    assert r.status_code == 200


def register_users():
    print('Registering user1')
    response = requests.post('http://localhost:12404/app/better-you/register', data=json.dumps(user1), headers=headers)
    assert response.status_code == 200
    token_user_1 = response.json()['token']

    print('Registering user2')
    response = requests.post('http://localhost:12404/app/better-you/register', data=json.dumps(user2), headers=headers)
    assert response.status_code == 200
    token_user_2 = response.json()['token']

    print('USERS REGISTER')
    print('USER 1 TOKEN = ' + token_user_1)
    print('USER 2 TOKEN = ' + token_user_2)
    return token_user_1, token_user_2


def verify_no_goals(tokens):
    print('Testing USER 1 has 0 goals')
    response = requests.post('http://localhost:12404/app/better-you/goals', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_goals = response.json()
    assert len(user1_goals) == 0

    print('Testing USER 2 has 0 goals')
    response = requests.post('http://localhost:12404/app/better-you/goals', data=json.dumps({'token': tokens[1]}),
                             headers=headers)
    user2_goals = response.json()
    assert len(user2_goals) == 0


def populate_goals(tokens):
    print('Adding goal to USER 1')
    usergoal1['token'] = tokens[0]
    response = requests.post('http://localhost:12404/app/better-you/goal', data=json.dumps(usergoal1), headers=headers)
    assert response.status_code == 200

    print('Adding goal to USER 1')
    usergoal2['token'] = tokens[0]
    response = requests.post('http://localhost:12404/app/better-you/goal', data=json.dumps(usergoal2), headers=headers)
    assert response.status_code == 200

    print('Testing USER 1 has 2 goals')
    response = requests.post('http://localhost:12404/app/better-you/goals', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_goals = response.json()
    assert len(user1_goals) == 2
    print('USER 1 goals\n', user1_goals)

    print('Adding goal to USER 2')
    usergoal3['token'] = tokens[1]
    response = requests.post('http://localhost:12404/app/better-you/goal', data=json.dumps(usergoal3), headers=headers)
    assert response.status_code == 200

    print('Adding goal to USER 2')
    usergoal4['token'] = tokens[1]
    response = requests.post('http://localhost:12404/app/better-you/goal', data=json.dumps(usergoal4), headers=headers)
    assert response.status_code == 200

    print('Testing USER 2 has 2 goals')
    response = requests.post('http://localhost:12404/app/better-you/goals', data=json.dumps({'token': tokens[1]}),
                             headers=headers)
    user2_goals = response.json()
    assert len(user2_goals) == 2
    print('USER 2 goals\n', user2_goals)


def verify_no_habits(tokens):
    print('Testing USER 1 has 0 habits')
    response = requests.post('http://localhost:12404/app/better-you/habits', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_habits = response.json()
    assert len(user1_habits) == 0

    print('Testing USER 2 has 0 habits')
    response = requests.post('http://localhost:12404/app/better-you/habits', data=json.dumps({'token': tokens[1]}),
                             headers=headers)
    user2_habits = response.json()
    assert len(user2_habits) == 0


def populate_habits(tokens):
    print('Adding habit to USER 1')
    userhabit1['token'] = tokens[0]
    response = requests.post('http://localhost:12404/app/better-you/habit', data=json.dumps(userhabit1),
                             headers=headers)
    assert response.status_code == 200

    print('Adding habit to USER 1')
    userhabit2['token'] = tokens[0]
    response = requests.post('http://localhost:12404/app/better-you/habit', data=json.dumps(userhabit2),
                             headers=headers)
    assert response.status_code == 200

    print('Testing USER 1 has 2 habits')
    response = requests.post('http://localhost:12404/app/better-you/habits', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_habits = response.json()
    assert len(user1_habits) == 2
    print('USER 1 HABITS\n', user1_habits)

    print('Adding habit to USER 2')
    userhabit3['token'] = tokens[1]
    response = requests.post('http://localhost:12404/app/better-you/habit', data=json.dumps(userhabit3),
                             headers=headers)
    assert response.status_code == 200

    print('Adding habit to USER 2')
    userhabit4['token'] = tokens[1]
    response = requests.post('http://localhost:12404/app/better-you/habit', data=json.dumps(userhabit4),
                             headers=headers)
    assert response.status_code == 200

    print('Testing USER 2 has 2 habits')
    response = requests.post('http://localhost:12404/app/better-you/habits', data=json.dumps({'token': tokens[1]}),
                             headers=headers)
    user2_habits = response.json()
    assert len(user2_habits) == 2
    print('USER 2 HABITS\n', user2_habits)

    return user1_habits, user2_habits


def verify_update_habits(tokens, user_habits):
    print('Testing HABIT UPDATE')

    userhabit1['habit']['description'] = 'modif description'
    userhabit1['habit']['title'] = 'modif title'
    userhabit1['habit']['id'] = user_habits[0][0]['id']
    response = requests.put('http://localhost:12404/app/better-you/habit', data=json.dumps(userhabit1), headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/habits', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_habits = response.json()
    assert len(user1_habits) == 2
    assert user1_habits[0]['description'] == 'modif description'
    assert user1_habits[0]['title'] == 'modif title'

    print('USER 1 HABITS\n', user1_habits)

    userhabit1['habit']['id'] = user_habits[0][0]['id']
    userhabit1['token'] = tokens[1]
    response = requests.put('http://localhost:12404/app/better-you/habit', data=json.dumps(userhabit1), headers=headers)
    assert response.status_code == 403

    userhabit1['token'] = tokens[0]


def verify_delete_habits(tokens, user_habits):
    userhabit1['habit']['id'] = user_habits[0][0]['id']
    response = requests.delete('http://localhost:12404/app/better-you/habit', data=json.dumps(userhabit1),
                               headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/habits', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_habits = response.json()
    assert len(user1_habits) == 1

    userhabit2['habit']['id'] = user_habits[0][1]['id']
    response = requests.delete('http://localhost:12404/app/better-you/habit', data=json.dumps(userhabit2),
                               headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/habits', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_habits = response.json()
    assert len(user1_habits) == 0


def main_test():
    erase_database()
    tokens = register_users()
    verify_no_goals(tokens)
    populate_goals(tokens)
    # verify_update_goals(tokens)
    # verify_delete_goals(tokens)
    verify_no_habits(tokens)
    user_habits = populate_habits(tokens)
    verify_update_habits(tokens, user_habits)
    verify_delete_habits(tokens, user_habits)


main_test()
