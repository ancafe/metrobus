'''
File: colorgenerator
Project: CodeGenerator
Author: Pablo Garrido
'''

from palettable.tableau import Tableau_20, GreenOrange_12
import glob

colors = [x for i, x in enumerate(Tableau_20.hex_colors) if i % 2 == 0] + GreenOrange_12.hex_colors + [
    x for i, x in enumerate(Tableau_20.hex_colors) if i % 2 == 1]
formatstring = '''.line{:s}{{
    stroke: {:s};
    color: {:s};
}}'''

for i, f in enumerate([f for f in glob.glob("CSV/*.csv") if "Lista de paradas" not in f]):
    linename = f.split("\\")[1].split("-")[0]
    print(formatstring.format(linename.lower(), colors[i], colors[i]))
