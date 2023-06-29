import requests
import json

todo1 = '{"id": 0, "title": "Fenster putzen", "done": false}'
todo1_json = json.loads(todo1)
todo2 = '{"id": 1, "title": "Geburtstagsgeschenk fuer Julian kaufen", "done": false}'
todo2_json = json.loads(todo2)
todo3 = '{"id": 2, "title": "Gartenarbeit", "done": false}'
todo3_json = json.loads(todo3)

url = "http://localhost:3000/todos"
# ******************** DELETE ALL TODOS **************************
payload = ""
response = requests.request("DELETE", url, data=payload)
response = requests.request("GET", url, data=payload)
alltodos =  json.loads(response.text)
if ([] == alltodos) or ({} == alltodos):
    print("********* DELETING ALL TODOS WAS SUCCESSFUL *********")
else:
    print("######### DELETING ALL TODOS WAS NOT SUCCESSFUL #########")
    input("Press Enter to continue...")


# ******************** ADD 3 NEW TODOS **************************
textplain = True
if textplain:
    headers = {'Content-Type': 'text/plain'}
    payload = "Fenster putzen"
    response1 = requests.request("POST", url, data=payload, headers=headers)
    response_todo1 =  json.loads(response1.text)
    payload = "Geburtstagsgeschenk fuer Julian kaufen"
    response2 = requests.request("POST", url, data=payload, headers=headers)
    response_todo2 =  json.loads(response2.text)
    payload = "Gartenarbeit"
    response3 = requests.request("POST", url, data=payload, headers=headers)
    response_todo3 =  json.loads(response3.text)
else:
    headers = {'Content-Type': 'application/json'}
    payload = "{\"title\": \"Fenster putzen\"}"
    response1 = requests.request("POST", url, data=payload, headers=headers)
    response_todo1 =  json.loads(response1.text)
    payload = "{\"title\": \"Geburtstagsgeschenk fuer Julian kaufen\"}"
    response2 = requests.request("POST", url, data=payload, headers=headers)
    response_todo2 =  json.loads(response2.text)
    payload = "{\"title\": \"Gartenarbeit\"}"
    response3 = requests.request("POST", url, data=payload, headers=headers)
    response_todo3 =  json.loads(response3.text)
    
    
print(response_todo1)
print(todo1_json)

if (response_todo1 == todo1_json) and (response_todo2 == todo2_json) and (response_todo3 == todo3_json):
    print("********* ADDING 3 TODOS WAS SUCCESSFUL *********")
else:
    print("######### ADDING 3 TODOS WAS  NOT SUCCESSFUL #########")
    input("Press Enter to continue...")

    
# ******************** GET ALL TODOS **************************
payload = ""
response = requests.request("GET", url, data=payload)
alltodos =  json.loads(response.text)
if alltodos == [todo1_json, todo2_json, todo3_json]:
    print("********* GETTING ALL TODOS WAS SUCCESSFUL *********")
else:
    print("######### GETTING ALL TODOS WAS NOT SUCCESSFUL #########")
    input("Press Enter to continue...")

# ******************** MARK TODO AS DONE **************************
payload = "[\n{ \"op\": \"replace\", \"path\": \"/done\", \"value\": true }\n]"
headers = {'Content-Type': 'application/json'}
response = requests.request("PATCH", url+"/1", data=payload, headers=headers)
print("********* MARK TODO AS DONE: ", response.text)
if (response.text.lower() == "bad request") or (response.text==''):
    # try another payload:
    payload = "\n{ \"op\": \"replace\", \"path\": \"/done\", \"value\": true }\n"
    response = requests.request("PATCH", url+"/1", data=payload, headers=headers)
    if response.text.lower() == "bad request" or (response.text==''):
        # try another payload:
        payload = "\n{ \"value\": true }\n"
        response = requests.request("PATCH", url+"/1", data=payload, headers=headers)
        if response.text.lower() == "bad request" or (response.text==''):
            print("######### MARK TODO AS DONE NOT SUCCESSFUL #########")
            input("Press Enter to continue...")
        else: 
            print("********* MARK TODO AS DONE WAS MAYBE SUCCESSFUL *********")    
    else: 
        print("********* MARK TODO AS DONE WAS MAYBE SUCCESSFUL *********")
else: 
    print("********* MARK TODO AS DONE WAS MAYBE SUCCESSFUL *********")
    
# ******************** GET DONE TODO **************************
payload = ""
response = requests.request("GET", url+"/1", data=payload)
response_todo2 =  json.loads(response.text)
todo2_json['done'] = True
if (response_todo2 == todo2_json):
    print("********* GETTING DONE TODO WAS SUCCESSFUL *********")
else:
    print("######### GETTING DONE TODO WAS NOT SUCCESSFUL #########")
    input("Press Enter to continue...")
    
# ******************** DELETE ALL DONE TODOS **************************
querystring = {"done":"true"}
payload = ""
response = requests.request("DELETE", url, data=payload, params=querystring)
alltodos.pop(1)
try:
    remaining_todos = json.loads(response.text)
    if alltodos == remaining_todos:
        print("********* DELETING ALL DONE TODOS WAS SUCCESSFUL *********")
    else:
        print("######### DELETING ALL DONE TODOS WAS NOT SUCCESSFUL #########")
        input("Press Enter to continue...")
except json.JSONDecodeError:
    print("######### DELETING ALL DONE TODOS RESPONSE (\"{}\") WAS BAD #########".format(response.text))

    

    
# ******************** DELETE SPECIFIC TODO **************************
payload = ""
response = requests.request("DELETE", url+"/2", data=payload)
response = requests.request("GET", url, data=payload)
alltodos =  json.loads(response.text)[0]
if todo1_json == alltodos:
    print("********* DELETING SPECIFIC TODOS WAS SUCCESSFUL *********")
else:
    print("######### DELETING SPECIFIC TODOS WAS NOT SUCCESSFUL #########")
    input("Press Enter to continue...")

# ******************** DELETE ALL TODOS **************************
payload = ""
response = requests.request("DELETE", url, data=payload)
response = requests.request("GET", url, data=payload)
alltodos =  json.loads(response.text)
if [] == alltodos:
    print("********* DELETING ALL TODOS WAS SUCCESSFUL *********")
else:
    print("######### DELETING ALL TODOS WAS NOT SUCCESSFUL #########")
