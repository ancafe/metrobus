'''
File: generator
Project: metrobus
Last Modified: Saturday, 24th July 2021 1:06:32 pm
Author: Pablo Garrido
Author: Ángel Cardiel (angel.cardiel@protonmail.com)
'''

import csv
import glob

print('''var jKstra = require('jkstra');
var projector = require('ecef-projector');

var graph = new jKstra.Graph();

var n = [];
var names = [];

var getNodeByName = name => {
                return n[names.indexOf(name)]
        }

''')

# Array stops
with open('CSV/Lista de paradas-RelativaNUEVASVG.csv', 'r') as csvfile:
    paradas = csv.reader(csvfile, delimiter=';')
    paradas = list(paradas)

arrayParadas = {}
for p in paradas[1:]:
    arrayParadas[p[0]] = p[1]

print('var stops = ', end="")
print(arrayParadas)
print()

objetoLineas = {}
for f in [f for f in glob.glob("CSV/*.csv") if "Lista de paradas" not in f]:
    with open(f, 'r') as csvfile:
        linename = f.split("\\")[1].split("-")[0]
        line = csv.reader(csvfile, delimiter=';')
        line = list(line)
        objetoLineas[linename] = [[l[0], l[1]] for l in line[1:]]
print('var lines = ', end="")
print(objetoLineas)
print()


formato = 'n.push(graph.addVertex({{name: "{:s}"}}))'
formato2 = 'names.push("{:s}")'

for key in objetoLineas:
    paradas = [item for sublist in objetoLineas[key] for item in sublist]
    paradas = list(dict.fromkeys(paradas))
    for name in [key+"-"+x for x in paradas]:
        print(formato.format(name))
        print(formato2.format(name))

print()

formato = 'graph.addEdge(getNodeByName("{:s}"), getNodeByName("{:s}"), {{time: {:s}, distance:{:s}, type: "{:s}"}})'
for f in [f for f in glob.glob("CSV/*.csv") if "Lista de paradas" not in f]:
    print()
    print()
    print()
    with open(f, 'r') as csvfile:
        linename = f.split("\\")[1].split("-")[0]
        line = csv.reader(csvfile, delimiter=';')
        line = list(line)
        for l in line[1:]:
            print(formato.format(linename+'-'+l[0], linename+'-'+l[1],
                  l[2].replace(',', '.'), l[3].replace(',', '.'), linename))


formato = 'graph.addEdge(getNodeByName("{:s}"), getNodeByName("{:s}"), {{time: {:s}, distance:{:s}, type: "{:s}"}})'

print()

lineasporparada = {}
for parada in arrayParadas:
    lineasporparada[parada] = []
    for linea in objetoLineas:
        paradasLinea = [item for sublist in objetoLineas[linea]
                        for item in sublist]
        if parada in [x.split("-")[0] for x in paradasLinea]:
            lineasporparada[parada].append(linea)
    if len(lineasporparada[parada]) > 1:
        for i in range(len(lineasporparada[parada])):
            for j in range(len(lineasporparada[parada])):
                if i is not j:
                    print(formato.format(
                        lineasporparada[parada][i]+'-'+parada, lineasporparada[parada][j]+'-'+parada, '3', '0', 'Change'))

print()
print("var linesinstop = ", end='')
print(lineasporparada)
