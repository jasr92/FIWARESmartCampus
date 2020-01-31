from django.http import request, HttpRequest, JsonResponse
from django.shortcuts import render
import requests
import json
import urllib3

urllib3.disable_warnings()

# Datos para acceder a la plataforma FIWARE
servicio = 'smart_campus_uma'
subservicio = '/fraterni_lab'
user = 'usr_fraterni_lab'
password = 'TVBjMdCd'

# Url plataforma FIWARE
url_plataforma = 'https://150.214.58.178'

# url para pedir token
puerto_token = ':6001'
path_token = '/v3/auth/tokens'

# url para pedir todas las entidades
puerto_entidades = ':2026'
path_entidades = ['/v2/entities?type=Arbol', '/v2/entities?type=Biodiversidad',
                  '/v2/entities?type=Cargadores', '/v2/entities?type=Zonas']
opciones_entidades = '&limit=1000&options=count'


def obtenerToken():
    data = {
        "auth": {
            "identity": {
                "methods": [
                    "password"
                ],
                "password": {
                    "user": {
                        "domain": {
                            "name": servicio
                        },
                        "name": user,
                        "password": password
                    }
                }
            },
            "scope": {
                "project": {
                    "domain": {
                        "name": servicio
                    },
                    "name": subservicio
                }
            }
        }
    }
    url_token = url_plataforma + puerto_token + path_token
    r = requests.post(url_token, data=JsonResponse(data), headers={'Content-Type': 'application/json'}, verify=False)

    return r.headers.get('X-Subject-Token')


def pedir_entidades(token,path_entidades):
    url_entidades = url_plataforma + puerto_entidades + path_entidades + opciones_entidades
    headers_entidades = {'Fiware-Service': 'smart_campus_uma', 'Fiware-ServicePath': '/fraterni_lab',
                         'X-Auth-Token': token
                         }
    # verify = False para saltarse el tema de los certificados
    obj = requests.get(url_entidades, headers=headers_entidades, verify=False)
    # print(obj.text)
    return obj.json()


def mostrar_mapa(request):
    # 1 - pedimos el token
    token = obtenerToken()
    # print('token = ' + token)

    # 2 - Pedimos las entidades que vamos a mostrar en el mapa
    #entidades = pedir_entidades(token, path_entidades[0])
    entidades=[]
    for i in range(len(path_entidades)):
     entidades.append(pedir_entidades(token,path_entidades[i]))

    #print('\n')
    #print(entidades)


    # print('respuesta: ' + entidades.text)
    # print (entidades)
    # return JsonResponse(entidades.json(), safe=False)
    # entidades = JsonResponse(entidades.json(), safe=False)
    num = 500
    # print (json.dumps(entidades))
    context = {
        'entidades': json.dumps(entidades),
        'numero': num,
    }

    print('\n')
    #print(len(path_entidades))
    print(json.dumps(entidades))
    print('\n')

    return render(request, 'mapa.html', context=context)
