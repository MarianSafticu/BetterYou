import requests
import json
from src.users import *
from src.myhttp import headers
from src.goals import *
from src.habits import *


def erase_database():
    print('-------->>> Erasing data')
    r = requests.post('http://localhost:12404/app/better-you/hades')
    assert r.status_code == 200


def register_users():
    print('-------->>> Registering users')
    tokens = []
    usernames = []

    for user in all_users:
        response = requests.post('http://localhost:12404/app/better-you/register', data=json.dumps(user),
                                 headers=headers)
        assert response.status_code == 200
        tokens.append(response.json()['token'])
        usernames.append(user['username'])

    print('TOKENS\n', tokens)

    print('Set users to verified')
    response = requests.post('http://localhost:12404/app/better-you/gaia', headers=headers)
    assert response.status_code == 200

    return tokens, usernames


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
    print('-------->>> Populating goals')
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

    return user1_goals, user2_goals


def verify_update_goals(tokens, user_goals):
    print('-------->>> Updating goals')

    user_goal_request = {
        'token': tokens[0],
        'userGoal': {
            'id': user_goals[0][0]['id'],
            'goal': {
                'id': user_goals[0][0]['goal']['id'],
                'progressToReach': 20
            },
            'currentProgress': 2,
            'public': False,
            'upvotes': 50,
            'downvotes': 10,
            'startDate': '2126-10-10',
            'endDate': '2222-10-10'
        }
    }

    response = requests.put('http://localhost:12404/app/better-you/goal', data=json.dumps(user_goal_request),
                            headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/goals', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_goals = response.json()
    assert len(user1_goals) == 2
    print('USER 1 goals\n', user1_goals)

    assert user1_goals[1]['currentProgress'] == 2 or user1_goals[0]['currentProgress'] == 2
    assert user1_goals[1]['public'] is False or user1_goals[0]['public'] is False


def verify_delete_goals(tokens, user_goals):
    print('-------->>> Deleting goals')
    deleterequest = {
        'token': tokens[0],
        'userGoal': {
            'id': user_goals[0][0]['id']
        }
    }
    response = requests.delete('http://localhost:12404/app/better-you/goal', data=json.dumps(deleterequest),
                               headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/goals', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_goals = response.json()
    assert len(user1_goals) == 1

    deleterequest = {
        'token': tokens[0],
        'userGoal': {
            'id': user_goals[0][1]['id']
        }
    }
    response = requests.delete('http://localhost:12404/app/better-you/goal', data=json.dumps(deleterequest),
                               headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/goals', data=json.dumps({'token': tokens[0]}),
                             headers=headers)
    user1_goals = response.json()
    assert len(user1_goals) == 0


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
    print('-------->>> Populating habits')
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
    print('-------->>>Habits update')

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


def verify_user_prefix_search(tokens):
    print('----------->>> User search by prefix')
    response = requests.post('http://localhost:12404/app/better-you/users',
                             data=json.dumps({'token': tokens[0], 'usernamePrefix': 'Da'}),
                             headers=headers)
    users_list = response.json()
    assert len(users_list) == 2
    print('USERS with prefix "Da"\n', users_list)

    response = requests.post('http://localhost:12404/app/better-you/users',
                             data=json.dumps({'token': tokens[1], 'usernamePrefix': 'ra'}),
                             headers=headers)
    users_list = response.json()
    assert len(users_list) == 3
    print('USERS with prefix "ra"\n', users_list)

    response = requests.post('http://localhost:12404/app/better-you/users',
                             data=json.dumps({'token': tokens[0], 'usernamePrefix': 'dane'}),
                             headers=headers)
    users_list = response.json()
    assert len(users_list) == 1
    print('USERS with prefix "dane"\n', users_list)

    response = requests.post('http://localhost:12404/app/better-you/users',
                             data=json.dumps({'token': tokens[0], 'usernamePrefix': 'xxx'}),
                             headers=headers)
    users_list = response.json()
    assert len(users_list) == 0
    print('USERS with prefix "xxx"\n', users_list)

    response = requests.post('http://localhost:12404/app/better-you/users',
                             data=json.dumps({'token': tokens[0], 'usernamePrefix': 'razvan'}),
                             headers=headers)
    users_list = response.json()
    assert len(users_list) == 0
    print('USERS with prefix "razvan" searched by "razvan"\n', users_list)


def verify_friend_requests(tokens, usernames):
    print('------>>> Generating friend requests')
    print('USERNAMES: ', usernames)

    response = requests.post('http://localhost:12404/app/better-you/friend/request',
                             data=json.dumps({'token': tokens[0], 'usernameReceiver': usernames[1]}),
                             headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/friend/request',
                             data=json.dumps({'token': tokens[0], 'usernameReceiver': usernames[2]}),
                             headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/friend/request',
                             data=json.dumps({'token': tokens[0], 'usernameReceiver': usernames[3]}),
                             headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/friend/request',
                             data=json.dumps({'token': tokens[0], 'usernameReceiver': usernames[1]}),
                             headers=headers)
    assert response.status_code == 403
    assert json.loads(response.text)['massage'] == 'Friend request already exists'

    response = requests.post('http://localhost:12404/app/better-you/friend/request',
                             data=json.dumps({'token': tokens[0], 'usernameReceiver': usernames[0]}),
                             headers=headers)
    assert response.status_code == 403
    assert json.loads(response.text)['massage'] == 'Cannot send friend request to self'

    response = requests.post('http://localhost:12404/app/better-you/friend/request',
                             data=json.dumps({'token': tokens[0], 'usernameReceiver': 'Ah oh uhhh'}),
                             headers=headers)
    assert response.status_code == 403
    assert json.loads(response.text)['massage'] == 'No user found with username=\'Ah oh uhhh\''


def verify_accept_reject_friend_requests(tokens, usernames):
    print('------>>> Accepting & rejecting friend requests')

    response = requests.post('http://localhost:12404/app/better-you/friend/request/list',
                             data=json.dumps({'token': tokens[1]}),
                             headers=headers)
    friendship_requests = response.json()
    assert len(friendship_requests) == 1

    response = requests.post('http://localhost:12404/app/better-you/friend/request/accept',
                             data=json.dumps({'token': tokens[1], 'usernameSender': usernames[0]}),
                             headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/friend/request/list',
                             data=json.dumps({'token': tokens[1]}),
                             headers=headers)
    friendship_requests = response.json()
    assert len(friendship_requests) == 0

    response = requests.post('http://localhost:12404/app/better-you/friend/request/list',
                             data=json.dumps({'token': tokens[2]}),
                             headers=headers)
    friendship_requests = response.json()
    assert len(friendship_requests) == 1

    response = requests.post('http://localhost:12404/app/better-you/friend/request/accept',
                             data=json.dumps({'token': tokens[2], 'usernameSender': usernames[0]}),
                             headers=headers)
    assert response.status_code == 200

    response = requests.post('http://localhost:12404/app/better-you/friend/request/list',
                             data=json.dumps({'token': tokens[2]}),
                             headers=headers)
    friendship_requests = response.json()
    assert len(friendship_requests) == 0

    response = requests.post('http://localhost:12404/app/better-you/friend/request/accept',
                             data=json.dumps({'token': tokens[3], 'usernameSender': usernames[0]}),
                             headers=headers)
    assert response.status_code == 200


def verify_friend_delete(tokens, usernames):
    print('------>>> Deleting friends')

    response = requests.delete('http://localhost:12404/app/better-you/friend/request',
                               data=json.dumps({'token': tokens[0], 'usernameRequested': usernames[1]}),
                               headers=headers)
    assert response.status_code == 200

    response = requests.delete('http://localhost:12404/app/better-you/friend/request',
                               data=json.dumps({'token': tokens[0], 'usernameRequested': usernames[2]}),
                               headers=headers)
    assert response.status_code == 200

    response = requests.delete('http://localhost:12404/app/better-you/friend/request',
                               data=json.dumps({'token': tokens[0], 'usernameRequested': usernames[3]}),
                               headers=headers)
    assert response.status_code == 200


def main_test():
    erase_database()
    tokens, usernames = register_users()
    verify_no_goals(tokens)
    user_goals = populate_goals(tokens)
    verify_update_goals(tokens, user_goals)
    verify_delete_goals(tokens, user_goals)
    verify_no_habits(tokens)
    user_habits = populate_habits(tokens)
    verify_update_habits(tokens, user_habits)
    verify_delete_habits(tokens, user_habits)
    verify_user_prefix_search(tokens)
    verify_friend_requests(tokens, usernames)
    verify_accept_reject_friend_requests(tokens, usernames)
    # verify_friend_delete(tokens, usernames)


main_test()
