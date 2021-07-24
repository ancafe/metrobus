(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var jKstra = require('jkstra');
var projector = require('ecef-projector');

var graph = new jKstra.Graph();

var n = [];
var names = [];

var getNodeByName = name => {
                return n[names.indexOf(name)]
        }


var stops = {
	'Afanas': '988.83, 520.51', 
	'Alameda Cristina': '429.83, 520.51',
	'Alameda Vieja': '440.83, 626.51',
	'Albariza': '557.76, 240.98',
	'Almunia': '910.83, 459.51',
	'Arcos': '675.83, 579.51',
	'Area Sur': '138.48, 269.98',
	'Arenal': '361.83, 579.51',
	'Av. Andalucia': '598.83, 241.51',
	'Av. de Italia': '98.83, 898.51',
	'Av. del Tamarix': '446.76, 240.98',
	'Av. Europa': '679.83, 359.51',
	'Av. La Granja': '910.83, 359.51',
	'Av. Nazaret': '767.48, 773.98',
	'Av. Taginaste': '791.48, 491.98',
	'Azorin': '369.48, 774.98',
	'Biarritz': '669.83, 458.51',
	'Blas Infante': '355.48, 841.98',
	'Caparrps': '255.48, 809.98',
	'Catavinos': '579.83, 458.51',
	'Caulina': '987.83, 458.51',
	'Cementerio': '912.83, 641.51',
	'Chapin': '675.48, 548.98',
	'Circunvalacion': '361.83, 186.51',
	'Ciudad de los Ninos': '747.83, 456.51',
	'Club Nazaret': '722.48, 773.98',
	'Consejo de Europa': '255.83, 774.51',
	'Corte Ingles': '588.83, 178.51',
	'Ctra. Guadalcacin': '986.83, 359.51',
	'Cuatro Caminos': '244.83, 689.51',
	'Diego de Cadiz': '429.8, 830.51',
	'Donantes de Sangre': '518.83, 240.51',
	'Duque de Abrantes': '440.48, 344.98',
	'El Almendral': '440.83, 308.51',
	'El Altillo': '675.83, 241.51',
	'El Motorista': '832.83, 459.51',
	'El Portal': '427.83, 890.51',
	'El Retiro': '665.83, 693.51',
	'Escuela de Arte Ecuestre': '440.48, 400.98',
	'Federico Garcia Lorca': '361.83, 240.51',
	'Feria': '596.48, 408.98',
	'Finlandia': '98.83, 836.51',
	'Gallo Azul': '439.83, 578.51',
	'Hontoria': '588.83, 303.51',
	'Hospital': '166.83, 186.51',
	'Hospital FREMAP': '245.83, 890.51',
	'IFECA': '588.83, 354.51',
	'La Canaleja': '826.48, 718.98',
	'La Consolacion': '724.48, 696.98',
	'La Granja': '831.83, 359.51',
	'La igualdad': '255.48, 846.98',
	'La Juventud': '308.48, 809.98',
	'La Marquesa': '904.48, 520.98',
	'La Pepa': '819.83, 178.51',
	'La Pita': '765.83, 580.51',
	'La Plata': '255.83, 241.51',
	'La Union': '283.76, 240.98',
	'Las Buganvillas': '518.83, 186.51',
	'Las Delicias': '755.83, 693.51',
	'Lola Flores': '681.48, 424.98',
	'Luis Vives': '255.48, 555.98',
	'Luz Shopping (i)': '98.83, 240.51',
	'Luz Shopping (ii)': '98.83, 98.83',
	'Madre de Dios': '522.83, 696.51',
	'Manuel F. Cruz': '952.48, 326.98',
	'Medina Sidonia': '596.48, 757.98',
	'Minotauro': '580.96, 686.51',
	'Moreno Mendoza': '518.83, 836.51',
	'Olivar de Rivero': '712.48, 540.98',
	'Palacio Municipal de Deportes': '680.48, 385.98',
	'Parque Atlantico': '675.83, 774.51',
	'Parque Vallesequillo': '583.83, 892.51',
	'Picaduenas': '176.48, 444.98',
	'Plaza de las Marinas': '329.2, 240.98',
	'Plaza del Caballo': '529.48, 377.98',
	'Plaza del Carbon': '371.48, 695.98',
	'Plaza Macedonia': '737.48, 723.98',
	'Porvera': '361.48, 526.98',
	'Pozo Albero': '598.83, 98.51',
	'Puerta de Rota': '255.48, 602.98',
	'Puertas del Sur': '176.83, 697.51',
	'Rocio': '222.48, 273.98',
	'Ronda de San Telmo': '427.83, 769.51',
	'Rotonda 4': '819.83, 769.51',
	'Rotonda 6': '821.83, 576.51',
	'San Jose Obrero': '909.48, 239.98',
	'San Juan de Dios': '176.83, 240.51',
	'San Telmo': '437.83, 696.51',
	'Santiago': '245.83, 521.51',
	'Setefilla': '987.83, 299.51',
	'Sevilla': '429.83, 458.51',
	'Tartessos': '701.48, 753.98',
	'Timanfaya': '723.48, 834.98',
	'Universidad': '675.48, 493.98',
	'UPACE': '176.83, 899.51',
	'Vallesequillo': '590.48, 800.98',
	'Villamarta': '514.83, 580.51',
	'Zoo': '249.48, 371.98'}

var lines = {
	'C1': [
		['Puertas del Sur', 'UPACE'],
		['UPACE', 'Hospital FREMAP'],
		['Hospital FREMAP', 'El Portal'],
		['El Portal', 'Parque Vallesequillo'],
		['Parque Vallesequillo', 'Timanfaya'],
		['Timanfaya', 'Rotonda 4'],
		['Rotonda 4', 'Rotonda 6'],
		['Rotonda 6', 'El Motorista'],
		['El Motorista', 'La Granja'],
		['La Granja', 'La Pepa'],
		['La Pepa', 'Corte Ingles'],
		['Corte Ingles', 'Las Buganvillas'],
		['Las Buganvillas', 'Circunvalacion'],
		['Circunvalacion', 'Hospital'],
		['Hospital', 'San Juan de Dios'],
		['San Juan de Dios', 'Picaduenas'],
		['Picaduenas', 'Puertas del Sur']],
	'C2': [
		['Puertas del Sur', 'Picaduenas'],
		['Picaduenas', 'San Juan de Dios'],
		['San Juan de Dios', 'Hospital'],
		['Hospital', 'Circunvalacion'],
		['Circunvalacion', 'Las Buganvillas'],
		['Las Buganvillas', 'Corte Ingles'],
		['Corte Ingles', 'La Pepa'],
		['La Pepa', 'La Granja'],
		['La Granja', 'El Motorista'],
		['El Motorista', 'Rotonda 6'],
		['Rotonda 6', 'Rotonda 4'],
		['Rotonda 4', 'Timanfaya'],
		['Timanfaya', 'Parque Vallesequillo'],
		['Parque Vallesequillo', 'El Portal'],
		['El Portal', 'Hospital FREMAP'],
		['Hospital FREMAP', 'UPACE'],
		['UPACE', 'Puertas del Sur']],
	'C3': [
		['Cuatro Caminos', 'Puerta de Rota'],
		['Puerta de Rota', 'Luis Vives'],
		['Luis Vives', 'Santiago'],
		['Santiago', 'Porvera'],
		['Porvera', 'Alameda Cristina'],
		['Alameda Cristina', 'Sevilla'],
		['Sevilla', 'Catavinos'],
		['Catavinos', 'Minotauro'],
		['Minotauro', 'Madre de Dios'],
		['Madre de Dios', 'San Telmo'],
		['San Telmo', 'Plaza del Carbon'],
		['Plaza del Carbon', 'Cuatro Caminos']],
	'C4': [
		['Cuatro Caminos', 'Plaza del Carbon'],
		['Plaza del Carbon', 'San Telmo'],
		['San Telmo', 'Madre de Dios'],
		['Madre de Dios', 'Minotauro'],
		['Minotauro', 'Catavinos'],
		['Catavinos', 'Sevilla'],
		['Sevilla', 'Alameda Cristina'],
		['Alameda Cristina', 'Porvera'],
		['Porvera', 'Santiago'],
		['Santiago', 'Luis Vives'],
		['Luis Vives', 'Puerta de Rota'],
		['Puerta de Rota', 'Cuatro Caminos']],
	'C5': [
		['Circunvalacion', 'Federico Garcia Lorca'],
		['Federico Garcia Lorca', 'El Almendral'],
		['El Almendral', 'Hontoria'],
		['Hontoria', 'IFECA'],
		['IFECA', 'Feria'],
		['Feria', 'Catavinos'],
		['Catavinos', 'Minotauro'],
		['Minotauro', 'Medina Sidonia'],
		['Medina Sidonia', 'Parque Vallesequillo'],
		['Parque Vallesequillo', 'Medina Sidonia'],
		['Medina Sidonia', 'Minotauro'],
		['Minotauro', 'Catavinos'],
		['Catavinos', 'Feria'],
		['Feria', 'IFECA'],
		['IFECA', 'Hontoria'],
		['Hontoria', 'El Almendral'],
		['El Almendral', 'Federico Garcia Lorca'],
		['Federico Garcia Lorca', 'Circunvalacion']],
	'E1': [
		['Parque Vallesequillo', 'Vallesequillo'],
		['Vallesequillo', 'Madre de Dios'],
		['Madre de Dios', 'Vallesequillo'],
		['Vallesequillo', 'Parque Vallesequillo']],
	'E2': [
		['El Portal', 'Moreno Mendoza'],
		['Moreno Mendoza', 'Diego de Cadiz'],
		['Diego de Cadiz', 'Ronda de San Telmo'],
		['Ronda de San Telmo', 'Azorin'],
		['Azorin', 'Consejo de Europa'],
		['Consejo de Europa', 'Caparros'],
		['Caparros', 'La igualdad'],
		['La igualdad', 'Hospital FREMAP'],
		['Hospital FREMAP', 'El Portal']],
	'E3': [
		['UPACE', 'Av. de Italia'],
		['Av. de Italia', 'Finlandia'],
		['Finlandia', 'UPACE']],
	'E4': [
		['Santiago', 'Zoo'],
		['Zoo', 'Rocio'],
		['Rocio', 'San Juan de Dios'],
		['San Juan de Dios', 'Luz Shopping (i)'],
		['Luz Shopping (i)', 'Luz Shopping (ii)'],
		['Luz Shopping (ii)', 'Area Sur'],
		['Area Sur', 'San Juan de Dios'],
		['San Juan de Dios', 'Rocio'],
		['Rocio', 'Zoo'],
		['Zoo', 'Santiago']],
	'E5': [
		['La Plata', 'La Union'],
		['La Union', 'Plaza de las Marinas'],
		['Plaza de las Marinas', 'Federico Garcia Lorca'],
		['Federico Garcia Lorca', 'Av. del Tamarix'],
		['Av. del Tamarix', 'Donantes de Sangre'],
		['Donantes de Sangre', 'Albariza'],
		['Albariza', 'Av. Andalucia'],
		['Av. Andalucia', 'El Altillo'],
		['El Altillo', 'Av. Andalucia'],
		['Av. Andalucia', 'Albariza'],
		['Albariza', 'Donantes de Sangre'],
		['Donantes de Sangre', 'Av. del Tamarix'],
		['Av. del Tamarix', 'Federico Garcia Lorca'],
		['Federico Garcia Lorca', 'Plaza de las Marinas'],
		['Plaza de las Marinas', 'La Union'],
		['La Union', 'La Plata']],
	'E6': [
		['Corte Ingles', 'La Pepa'],
		['La Pepa', 'San Jose Obrero'],
		['San Jose Obrero', 'Setefilla'],
		['Setefilla', 'Manuel F. Cruz'],
		['Manuel F. Cruz', 'Av. La Granja'],
		['Av. La Granja', 'Almunia'],
		['Almunia', 'Afanas'],
		['Afanas', 'La Marquesa'],
		['La Marquesa', 'Rotonda 6'],
		['Rotonda 6', 'La Marquesa'],
		['La Marquesa', 'Afanas'],
		['Afanas', 'Caulina'],
		['Caulina', 'Ctra. Guadalcacin'],
		['Ctra. Guadalcacin', 'Setefilla'],
		['Setefilla', 'San Jose Obrero'],
		['San Jose Obrero', 'La Pepa'],
		['La Pepa', 'Corte Ingles']],
	'E7': [
		['Av. Europa', 'Palacio Municipal de Deportes'],
		['Palacio Municipal de Deportes', 'Lola Flores'],
		['Lola Flores', 'Biarritz'],
		['Biarritz', 'Olivar de Rivero'],
		['Olivar de Rivero', 'La Pita'],
		['La Pita', 'Rotonda 6'],
		['Rotonda 6', 'Av. Taginaste'],
		['Av. Taginaste', 'Ciudad de los Ninos'],
		['Ciudad de los Ninos', 'Biarritz'],
		['Biarritz', 'Lola Flores'],
		['Lola Flores', 'Palacio Municipal de Deportes'],
		['Palacio Municipal de Deportes', 'Av. Europa']],
	'E8': [
		['El Retiro', 'Parque Atlantico'],
		['Parque Atlantico', 'Club Nazaret'],
		['Club Nazaret', 'Av. Nazaret'],
		['Av. Nazaret', 'Rotonda 4'],
		['Rotonda 4', 'La Canaleja'],
		['La Canaleja', 'Las Delicias'],
		['Las Delicias', 'Plaza Macedonia'],
		['Plaza Macedonia', 'Tartessos'],
		['Tartessos', 'Parque Atlantico'],
		['Parque Atlantico', 'El Retiro']],
	'L1': [
		['El Portal', 'Diego de Cadiz'],
		['Diego de Cadiz', 'Ronda de San Telmo'],
		['Ronda de San Telmo', 'San Telmo'],
		['San Telmo', 'Ronda de San Telmo'],
		['Ronda de San Telmo', 'Diego de Cadiz'],
		['Diego de Cadiz', 'El Portal']],
	'L2': [
		['El Portal', 'Blas Infante'],
		['Blas Infante', 'La Juventud'],
		['La Juventud', 'Consejo de Europa'],
		['Consejo de Europa', 'Cuatro Caminos'],
		['Cuatro Caminos', 'Consejo de Europa'],
		['Consejo de Europa', 'La Juventud'],
		['La Juventud', 'Blas Infante'],
		['Blas Infante', 'El Portal']],
	'L3': [
		['Hospital', 'La Plata'],
		['La Plata', 'Santiago'],
		['Santiago', 'La Plata'],
		['La Plata', 'Hospital']],
	'L4': [
		['Alameda Cristina', 'Sevilla'],
		['Sevilla', 'Escuela de Arte Ecuestre'],
		['Escuela de Arte Ecuestre', 'Duque de Abrantes'],
		['Duque de Abrantes', 'El Almendral'],
		['El Almendral', 'Donantes de Sangre'],
		['Donantes de Sangre', 'Las Buganvillas'],
		['Las Buganvillas', 'Donantes de Sangre'],
		['Donantes de Sangre', 'El Almendral'],
		['El Almendral', 'Duque de Abrantes'],
		['Duque de Abrantes', 'Escuela de Arte Ecuestre'],
		['Escuela de Arte Ecuestre', 'Sevilla'],
		['Sevilla', 'Alameda Cristina']],
	'L5': [
		['Alameda Cristina', 'Sevilla'],
		['Sevilla', 'Plaza del Caballo'],
		['Plaza del Caballo', 'Hontoria'],
		['Hontoria', 'Av. Andalucia'],
		['Av. Andalucia', 'Corte Ingles'],
		['Corte Ingles', 'Pozo Albero'],
		['Pozo Albero', 'Corte Ingles'],
		['Corte Ingles', 'Av. Andaluciaa'],
		['Av. Andalucia', 'Hontoria'],
		['Hontoria', 'Plaza del Caballo'],
		['Plaza del Caballo', 'Sevilla'],
		['Sevilla', 'Alameda Cristina']],
	'L6': [
		['Hontoria', 'IFECA'],
		['IFECA', 'Av. Europa'],
		['Av. Europa', 'La Granja'],
		['La Granja', 'Av. La Granja'],
		['Av. La Granja', 'Ctra. Guadalcacin'],
		['Ctra. Guadalcacin', 'Av. La Granja'],
		['Av. La Granja', 'La Granja'],
		['La Granja', 'Av. Europa'],
		['Av. Europa', 'IFECA'],
		['IFECA', 'Hontoria']],
	'L7': [
		['Villamarta', 'Arcos'],
		['Arcos', 'Chapin'],
		['Chapin', 'Universidad'],
		['Universidad', 'Biarritz'],
		['Biarritz', 'Ciudad de los Ninos'],
		['Ciudad de los Ninos', 'El Motorista'],
		['El Motorista', 'Almunia'],
		['Almunia', 'Caulina'],
		['Caulina', 'Almunia'],
		['Almunia', 'El Motorista'],
		['El Motorista', 'Ciudad de los Ninos'],
		['Ciudad de los Ninos', 'Biarritz'],
		['Biarritz', 'Universidad'],
		['Universidad', 'Chapin'],
		['Chapin', 'Arcos'],
		['Arcos', 'Minotauro'],
		['Minotauro', 'Villamarta']],
	'L8': [
		['Villamarta', 'Minotauro'],
		['Minotauro', 'El Retiro'],
		['El Retiro', 'La Consolacion'],
		['La Consolacion', 'Las Delicias'],
		['Las Delicias', 'La Pita'],
		['La Pita', 'Rotonda 6'],
		['Rotonda 6', 'Cementerio'],
		['Cementerio', 'Rotonda 6'],
		['Rotonda 6', 'La Pita'],
		['La Pita', 'Las Delicias'],
		['Las Delicias', 'La Consolacion'],
		['La Consolacion', 'El Retiro'],
		['El Retiro', 'Minotauro'],
		['Minotauro', 'Villamarta']],
	'LT': [
		['Alameda Cristina', 'Gallo Azul'],
		['Gallo Azul', 'Arenal'],
		['Arenal', 'Alameda Vieja'],
		['Alameda Vieja', 'Cuatro Caminos'],
		['Cuatro Caminos', 'Puertas del Sur'],
		['Puertas del Sur', 'Cuatro Caminos'],
		['Cuatro Caminos', 'Alameda Vieja'],
		['Alameda Vieja', 'Gallo Azul'],
		['Gallo Azul', 'Arenal'],
		['Arenal', 'Alameda Cristina']]}

n.push(graph.addVertex({name: "C1-Puertas del Sur"}))
names.push("C1-Puertas del Sur")
n.push(graph.addVertex({name: "C1-UPACE"}))
names.push("C1-UPACE")
n.push(graph.addVertex({name: "C1-Hospital FREMAP"}))
names.push("C1-Hospital FREMAP")
n.push(graph.addVertex({name: "C1-El Portal"}))
names.push("C1-El Portal")
n.push(graph.addVertex({name: "C1-Parque Vallesequillo"}))
names.push("C1-Parque Vallesequillo")
n.push(graph.addVertex({name: "C1-Timanfaya"}))
names.push("C1-Timanfaya")
n.push(graph.addVertex({name: "C1-Rotonda 4"}))
names.push("C1-Rotonda 4")
n.push(graph.addVertex({name: "C1-Rotonda 6"}))
names.push("C1-Rotonda 6")
n.push(graph.addVertex({name: "C1-El Motorista"}))
names.push("C1-El Motorista")
n.push(graph.addVertex({name: "C1-La Granja"}))
names.push("C1-La Granja")
n.push(graph.addVertex({name: "C1-La Pepa"}))
names.push("C1-La Pepa")
n.push(graph.addVertex({name: "C1-Corte Ingles"}))
names.push("C1-Corte Ingles")
n.push(graph.addVertex({name: "C1-Las Buganvillas"}))
names.push("C1-Las Buganvillas")
n.push(graph.addVertex({name: "C1-Circunvalacion"}))
names.push("C1-Circunvalacion")
n.push(graph.addVertex({name: "C1-Hospital"}))
names.push("C1-Hospital")
n.push(graph.addVertex({name: "C1-San Juan de Dios"}))
names.push("C1-San Juan de Dios")
n.push(graph.addVertex({name: "C1-Picaduenas"}))
names.push("C1-Picaduenas")
n.push(graph.addVertex({name: "C2-Puertas del Sur"}))
names.push("C2-Puertas del Sur")
n.push(graph.addVertex({name: "C2-Picaduenas"}))
names.push("C2-Picaduenas")
n.push(graph.addVertex({name: "C2-San Juan de Dios"}))
names.push("C2-San Juan de Dios")
n.push(graph.addVertex({name: "C2-Hospital"}))
names.push("C2-Hospital")
n.push(graph.addVertex({name: "C2-Circunvalacion"}))
names.push("C2-Circunvalacion")
n.push(graph.addVertex({name: "C2-Las Buganvillas"}))
names.push("C2-Las Buganvillas")
n.push(graph.addVertex({name: "C2-Corte Ingles"}))
names.push("C2-Corte Ingles")
n.push(graph.addVertex({name: "C2-La Pepa"}))
names.push("C2-La Pepa")
n.push(graph.addVertex({name: "C2-La Granja"}))
names.push("C2-La Granja")
n.push(graph.addVertex({name: "C2-El Motorista"}))
names.push("C2-El Motorista")
n.push(graph.addVertex({name: "C2-Rotonda 6"}))
names.push("C2-Rotonda 6")
n.push(graph.addVertex({name: "C2-Rotonda 4"}))
names.push("C2-Rotonda 4")
n.push(graph.addVertex({name: "C2-Timanfaya"}))
names.push("C2-Timanfaya")
n.push(graph.addVertex({name: "C2-Parque Vallesequillo"}))
names.push("C2-Parque Vallesequillo")
n.push(graph.addVertex({name: "C2-El Portal"}))
names.push("C2-El Portal")
n.push(graph.addVertex({name: "C2-Hospital FREMAP"}))
names.push("C2-Hospital FREMAP")
n.push(graph.addVertex({name: "C2-UPACE"}))
names.push("C2-UPACE")
n.push(graph.addVertex({name: "C3-Cuatro Caminos"}))
names.push("C3-Cuatro Caminos")
n.push(graph.addVertex({name: "C3-Puerta de Rota"}))
names.push("C3-Puerta de Rota")
n.push(graph.addVertex({name: "C3-Luis Vives"}))
names.push("C3-Luis Vives")
n.push(graph.addVertex({name: "C3-Santiago"}))
names.push("C3-Santiago")
n.push(graph.addVertex({name: "C3-Porvera"}))
names.push("C3-Porvera")
n.push(graph.addVertex({name: "C3-Alameda Cristina"}))
names.push("C3-Alameda Cristina")
n.push(graph.addVertex({name: "C3-Sevilla"}))
names.push("C3-Sevilla")
n.push(graph.addVertex({name: "C3-Catavinos"}))
names.push("C3-Catavinos")
n.push(graph.addVertex({name: "C3-Minotauro"}))
names.push("C3-Minotauro")
n.push(graph.addVertex({name: "C3-Madre de Dios"}))
names.push("C3-Madre de Dios")
n.push(graph.addVertex({name: "C3-San Telmo"}))
names.push("C3-San Telmo")
n.push(graph.addVertex({name: "C3-Plaza del Carbon"}))
names.push("C3-Plaza del Carbon")
n.push(graph.addVertex({name: "C4-Cuatro Caminos"}))
names.push("C4-Cuatro Caminos")
n.push(graph.addVertex({name: "C4-Plaza del Carbon"}))
names.push("C4-Plaza del Carbon")
n.push(graph.addVertex({name: "C4-San Telmo"}))
names.push("C4-San Telmo")
n.push(graph.addVertex({name: "C4-Madre de Dios"}))
names.push("C4-Madre de Dios")
n.push(graph.addVertex({name: "C4-Minotauro"}))
names.push("C4-Minotauro")
n.push(graph.addVertex({name: "C4-Catavinos"}))
names.push("C4-Catavinos")
n.push(graph.addVertex({name: "C4-Sevilla"}))
names.push("C4-Sevilla")
n.push(graph.addVertex({name: "C4-Alameda Cristina"}))
names.push("C4-Alameda Cristina")
n.push(graph.addVertex({name: "C4-Porvera"}))
names.push("C4-Porvera")
n.push(graph.addVertex({name: "C4-Santiago"}))
names.push("C4-Santiago")
n.push(graph.addVertex({name: "C4-Luis Vives"}))
names.push("C4-Luis Vives")
n.push(graph.addVertex({name: "C4-Puerta de Rota"}))
names.push("C4-Puerta de Rota")
n.push(graph.addVertex({name: "C5-Circunvalacion"}))
names.push("C5-Circunvalacion")
n.push(graph.addVertex({name: "C5-Federico Garcia Lorca"}))
names.push("C5-Federico Garcia Lorca")
n.push(graph.addVertex({name: "C5-El Almendral"}))
names.push("C5-El Almendral")
n.push(graph.addVertex({name: "C5-Hontoria"}))
names.push("C5-Hontoria")
n.push(graph.addVertex({name: "C5-IFECA"}))
names.push("C5-IFECA")
n.push(graph.addVertex({name: "C5-Feria"}))
names.push("C5-Feria")
n.push(graph.addVertex({name: "C5-Catavinos"}))
names.push("C5-Catavinos")
n.push(graph.addVertex({name: "C5-Minotauro"}))
names.push("C5-Minotauro")
n.push(graph.addVertex({name: "C5-Medina Sidonia"}))
names.push("C5-Medina Sidonia")
n.push(graph.addVertex({name: "C5-Parque Vallesequillo"}))
names.push("C5-Parque Vallesequillo")
n.push(graph.addVertex({name: "E1-Parque Vallesequillo"}))
names.push("E1-Parque Vallesequillo")
n.push(graph.addVertex({name: "E1-Vallesequillo"}))
names.push("E1-Vallesequillo")
n.push(graph.addVertex({name: "E1-Madre de Dios"}))
names.push("E1-Madre de Dios")
n.push(graph.addVertex({name: "E2-El Portal"}))
names.push("E2-El Portal")
n.push(graph.addVertex({name: "E2-Moreno Mendoza"}))
names.push("E2-Moreno Mendoza")
n.push(graph.addVertex({name: "E2-Diego de Cadiz"}))
names.push("E2-Diego de Cadiz")
n.push(graph.addVertex({name: "E2-Ronda de San Telmo"}))
names.push("E2-Ronda de San Telmo")
n.push(graph.addVertex({name: "E2-Azorin"}))
names.push("E2-Azorin")
n.push(graph.addVertex({name: "E2-Consejo de Europa"}))
names.push("E2-Consejo de Europa")
n.push(graph.addVertex({name: "E2-Caparros"}))
names.push("E2-Caparros")
n.push(graph.addVertex({name: "E2-La igualdad"}))
names.push("E2-La igualdad")
n.push(graph.addVertex({name: "E2-Hospital FREMAP"}))
names.push("E2-Hospital FREMAP")
n.push(graph.addVertex({name: "E3-UPACE"}))
names.push("E3-UPACE")
n.push(graph.addVertex({name: "E3-Av. de Italia"}))
names.push("E3-Av. de Italia")
n.push(graph.addVertex({name: "E3-Finlandia"}))
names.push("E3-Finlandia")
n.push(graph.addVertex({name: "E4-Santiago"}))
names.push("E4-Santiago")
n.push(graph.addVertex({name: "E4-Zoo"}))
names.push("E4-Zoo")
n.push(graph.addVertex({name: "E4-Rocio"}))
names.push("E4-Rocio")
n.push(graph.addVertex({name: "E4-San Juan de Dios"}))
names.push("E4-San Juan de Dios")
n.push(graph.addVertex({name: "E4-Luz Shopping (i)"}))
names.push("E4-Luz Shopping (i)")
n.push(graph.addVertex({name: "E4-Luz Shopping (ii)"}))
names.push("E4-Luz Shopping (ii)")
n.push(graph.addVertex({name: "E4-Area Sur"}))
names.push("E4-Area Sur")
n.push(graph.addVertex({name: "E5-La Plata"}))
names.push("E5-La Plata")
n.push(graph.addVertex({name: "E5-La Union"}))
names.push("E5-La Union")
n.push(graph.addVertex({name: "E5-Plaza de las Marinas"}))
names.push("E5-Plaza de las Marinas")
n.push(graph.addVertex({name: "E5-Federico Garcia Lorca"}))
names.push("E5-Federico Garcia Lorca")
n.push(graph.addVertex({name: "E5-Av. del Tamarix"}))
names.push("E5-Av. del Tamarix")
n.push(graph.addVertex({name: "E5-Donantes de Sangre"}))
names.push("E5-Donantes de Sangre")
n.push(graph.addVertex({name: "E5-Albariza"}))
names.push("E5-Albariza")
n.push(graph.addVertex({name: "E5-Av. Andalucia"}))
names.push("E5-Av. Andalucia")
n.push(graph.addVertex({name: "E5-El Altillo"}))
names.push("E5-El Altillo")
n.push(graph.addVertex({name: "E6-Corte Ingles"}))
names.push("E6-Corte Ingles")
n.push(graph.addVertex({name: "E6-La Pepa"}))
names.push("E6-La Pepa")
n.push(graph.addVertex({name: "E6-San Jose Obrero"}))
names.push("E6-San Jose Obrero")
n.push(graph.addVertex({name: "E6-Setefilla"}))
names.push("E6-Setefilla")
n.push(graph.addVertex({name: "E6-Manuel F. Cruz"}))
names.push("E6-Manuel F. Cruz")
n.push(graph.addVertex({name: "E6-Av. La Granja"}))
names.push("E6-Av. La Granja")
n.push(graph.addVertex({name: "E6-Almunia"}))
names.push("E6-Almunia")
n.push(graph.addVertex({name: "E6-Afanas"}))
names.push("E6-Afanas")
n.push(graph.addVertex({name: "E6-La Marquesa"}))
names.push("E6-La Marquesa")
n.push(graph.addVertex({name: "E6-Rotonda 6"}))
names.push("E6-Rotonda 6")
n.push(graph.addVertex({name: "E6-Caulina"}))
names.push("E6-Caulina")
n.push(graph.addVertex({name: "E6-Ctra. Guadalcacin"}))
names.push("E6-Ctra. Guadalcacin")
n.push(graph.addVertex({name: "E7-Av. Europa"}))
names.push("E7-Av. Europa")
n.push(graph.addVertex({name: "E7-Palacio Municipal de Deportes"}))
names.push("E7-Palacio Municipal de Deportes")
n.push(graph.addVertex({name: "E7-Lola Flores"}))
names.push("E7-Lola Flores")
n.push(graph.addVertex({name: "E7-Biarritz"}))
names.push("E7-Biarritz")
n.push(graph.addVertex({name: "E7-Olivar de Rivero"}))
names.push("E7-Olivar de Rivero")
n.push(graph.addVertex({name: "E7-La Pita"}))
names.push("E7-La Pita")
n.push(graph.addVertex({name: "E7-Rotonda 6"}))
names.push("E7-Rotonda 6")
n.push(graph.addVertex({name: "E7-Av. Taginaste"}))
names.push("E7-Av. Taginaste")
n.push(graph.addVertex({name: "E7-Ciudad de los Ninos"}))
names.push("E7-Ciudad de los Ninos")
n.push(graph.addVertex({name: "E8-El Retiro"}))
names.push("E8-El Retiro")
n.push(graph.addVertex({name: "E8-Parque Atlantico"}))
names.push("E8-Parque Atlantico")
n.push(graph.addVertex({name: "E8-Club Nazaret"}))
names.push("E8-Club Nazaret")
n.push(graph.addVertex({name: "E8-Av. Nazaret"}))
names.push("E8-Av. Nazaret")
n.push(graph.addVertex({name: "E8-Rotonda 4"}))
names.push("E8-Rotonda 4")
n.push(graph.addVertex({name: "E8-La Canaleja"}))
names.push("E8-La Canaleja")
n.push(graph.addVertex({name: "E8-Las Delicias"}))
names.push("E8-Las Delicias")
n.push(graph.addVertex({name: "E8-Plaza Macedonia"}))
names.push("E8-Plaza Macedonia")
n.push(graph.addVertex({name: "E8-Tartessos"}))
names.push("E8-Tartessos")
n.push(graph.addVertex({name: "L1-El Portal"}))
names.push("L1-El Portal")
n.push(graph.addVertex({name: "L1-Diego de Cadiz"}))
names.push("L1-Diego de Cadiz")
n.push(graph.addVertex({name: "L1-Ronda de San Telmo"}))
names.push("L1-Ronda de San Telmo")
n.push(graph.addVertex({name: "L1-San Telmo"}))
names.push("L1-San Telmo")
n.push(graph.addVertex({name: "L2-El Portal"}))
names.push("L2-El Portal")
n.push(graph.addVertex({name: "L2-Blas Infante"}))
names.push("L2-Blas Infante")
n.push(graph.addVertex({name: "L2-La Juventud"}))
names.push("L2-La Juventud")
n.push(graph.addVertex({name: "L2-Consejo de Europa"}))
names.push("L2-Consejo de Europa")
n.push(graph.addVertex({name: "L2-Cuatro Caminos"}))
names.push("L2-Cuatro Caminos")
n.push(graph.addVertex({name: "L3-Hospital"}))
names.push("L3-Hospital")
n.push(graph.addVertex({name: "L3-La Plata"}))
names.push("L3-La Plata")
n.push(graph.addVertex({name: "L3-Santiago"}))
names.push("L3-Santiago")
n.push(graph.addVertex({name: "L4-Alameda Cristina"}))
names.push("L4-Alameda Cristina")
n.push(graph.addVertex({name: "L4-Sevilla"}))
names.push("L4-Sevilla")
n.push(graph.addVertex({name: "L4-Escuela de Arte Ecuestre"}))
names.push("L4-Escuela de Arte Ecuestre")
n.push(graph.addVertex({name: "L4-Duque de Abrantes"}))
names.push("L4-Duque de Abrantes")
n.push(graph.addVertex({name: "L4-El Almendral"}))
names.push("L4-El Almendral")
n.push(graph.addVertex({name: "L4-Donantes de Sangre"}))
names.push("L4-Donantes de Sangre")
n.push(graph.addVertex({name: "L4-Las Buganvillas"}))
names.push("L4-Las Buganvillas")
n.push(graph.addVertex({name: "L5-Alameda Cristina"}))
names.push("L5-Alameda Cristina")
n.push(graph.addVertex({name: "L5-Sevilla"}))
names.push("L5-Sevilla")
n.push(graph.addVertex({name: "L5-Plaza del Caballo"}))
names.push("L5-Plaza del Caballo")
n.push(graph.addVertex({name: "L5-Hontoria"}))
names.push("L5-Hontoria")
n.push(graph.addVertex({name: "L5-Av. Andalucia"}))
names.push("L5-Av. Andalucia")
n.push(graph.addVertex({name: "L5-Corte Ingles"}))
names.push("L5-Corte Ingles")
n.push(graph.addVertex({name: "L5-Pozo Albero"}))
names.push("L5-Pozo Albero")
n.push(graph.addVertex({name: "L6-Hontoria"}))
names.push("L6-Hontoria")
n.push(graph.addVertex({name: "L6-IFECA"}))
names.push("L6-IFECA")
n.push(graph.addVertex({name: "L6-Av. Europa"}))
names.push("L6-Av. Europa")
n.push(graph.addVertex({name: "L6-La Granja"}))
names.push("L6-La Granja")
n.push(graph.addVertex({name: "L6-Av. La Granja"}))
names.push("L6-Av. La Granja")
n.push(graph.addVertex({name: "L6-Ctra. Guadalcacin"}))
names.push("L6-Ctra. Guadalcacin")
n.push(graph.addVertex({name: "L7-Villamarta"}))
names.push("L7-Villamarta")
n.push(graph.addVertex({name: "L7-Arcos"}))
names.push("L7-Arcos")
n.push(graph.addVertex({name: "L7-Chapin"}))
names.push("L7-Chapin")
n.push(graph.addVertex({name: "L7-Universidad"}))
names.push("L7-Universidad")
n.push(graph.addVertex({name: "L7-Biarritz"}))
names.push("L7-Biarritz")
n.push(graph.addVertex({name: "L7-Ciudad de los Ninos"}))
names.push("L7-Ciudad de los Ninos")
n.push(graph.addVertex({name: "L7-El Motorista"}))
names.push("L7-El Motorista")
n.push(graph.addVertex({name: "L7-Almunia"}))
names.push("L7-Almunia")
n.push(graph.addVertex({name: "L7-Caulina"}))
names.push("L7-Caulina")
n.push(graph.addVertex({name: "L7-Minotauro"}))
names.push("L7-Minotauro")
n.push(graph.addVertex({name: "L8-Villamarta"}))
names.push("L8-Villamarta")
n.push(graph.addVertex({name: "L8-Minotauro"}))
names.push("L8-Minotauro")
n.push(graph.addVertex({name: "L8-El Retiro"}))
names.push("L8-El Retiro")
n.push(graph.addVertex({name: "L8-La Consolacion"}))
names.push("L8-La Consolacion")
n.push(graph.addVertex({name: "L8-Las Delicias"}))
names.push("L8-Las Delicias")
n.push(graph.addVertex({name: "L8-La Pita"}))
names.push("L8-La Pita")
n.push(graph.addVertex({name: "L8-Rotonda 6"}))
names.push("L8-Rotonda 6")
n.push(graph.addVertex({name: "L8-Cementerio"}))
names.push("L8-Cementerio")
n.push(graph.addVertex({name: "LT-Alameda Cristina"}))
names.push("LT-Alameda Cristina")
n.push(graph.addVertex({name: "LT-Gallo Azul"}))
names.push("LT-Gallo Azul")
n.push(graph.addVertex({name: "LT-Arenal"}))
names.push("LT-Arenal")
n.push(graph.addVertex({name: "LT-Alameda Vieja"}))
names.push("LT-Alameda Vieja")
n.push(graph.addVertex({name: "LT-Cuatro Caminos"}))
names.push("LT-Cuatro Caminos")
n.push(graph.addVertex({name: "LT-Puertas del Sur"}))
names.push("LT-Puertas del Sur")




graph.addEdge(getNodeByName("C1-Puertas del Sur"), getNodeByName("C1-UPACE"), {time: 1, distance:550, type: "C1"})
graph.addEdge(getNodeByName("C1-UPACE"), getNodeByName("C1-Hospital FREMAP"), {time: 1.3, distance:650.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Hospital FREMAP"), getNodeByName("C1-El Portal"), {time: 1.2, distance:600.0, type: "C1"})
graph.addEdge(getNodeByName("C1-El Portal"), getNodeByName("C1-Parque Vallesequillo"), {time: 2.6, distance:1300.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Parque Vallesequillo"), getNodeByName("C1-Timanfaya"), {time: 2.2, distance:1100.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Timanfaya"), getNodeByName("C1-Rotonda 4"), {time: 1.4, distance:700.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Rotonda 4"), getNodeByName("C1-Rotonda 6"), {time: 2.8, distance:1400.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Rotonda 6"), getNodeByName("C1-El Motorista"), {time: 1.9, distance:950.0, type: "C1"})
graph.addEdge(getNodeByName("C1-El Motorista"), getNodeByName("C1-La Granja"), {time: 1.6, distance:800.0, type: "C1"})
graph.addEdge(getNodeByName("C1-La Granja"), getNodeByName("C1-La Pepa"), {time: 1.8, distance:900.0, type: "C1"})
graph.addEdge(getNodeByName("C1-La Pepa"), getNodeByName("C1-Corte Ingles"), {time: 0.6, distance:300.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Corte Ingles"), getNodeByName("C1-Las Buganvillas"), {time: 2.2, distance:1100.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Las Buganvillas"), getNodeByName("C1-Circunvalacion"), {time: 3.0, distance:1500.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Circunvalacion"), getNodeByName("C1-Hospital"), {time: 1.5, distance:750.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Hospital"), getNodeByName("C1-San Juan de Dios"), {time: 1.1, distance:550.0, type: "C1"})
graph.addEdge(getNodeByName("C1-San Juan de Dios"), getNodeByName("C1-Picaduenas"), {time: 2.6, distance:1300.0, type: "C1"})
graph.addEdge(getNodeByName("C1-Picaduenas"), getNodeByName("C1-Puertas del Sur"), {time: 2.6, distance:1300.0, type: "C1"})



graph.addEdge(getNodeByName("C2-Puertas del Sur"), getNodeByName("C2-Picaduenas"), {time: 2.6, distance:1300.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Picaduenas"), getNodeByName("C2-San Juan de Dios"), {time: 2.6, distance:1300.0, type: "C2"})
graph.addEdge(getNodeByName("C2-San Juan de Dios"), getNodeByName("C2-Hospital"), {time: 1.1, distance:550.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Hospital"), getNodeByName("C2-Circunvalacion"), {time: 1.5, distance:750.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Circunvalacion"), getNodeByName("C2-Las Buganvillas"), {time: 3.0, distance:1500.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Las Buganvillas"), getNodeByName("C2-Corte Ingles"), {time: 2.2, distance:1100.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Corte Ingles"), getNodeByName("C2-La Pepa"), {time: 0.6, distance:300.0, type: "C2"})
graph.addEdge(getNodeByName("C2-La Pepa"), getNodeByName("C2-La Granja"), {time: 1.8, distance:900.0, type: "C2"})
graph.addEdge(getNodeByName("C2-La Granja"), getNodeByName("C2-El Motorista"), {time: 1.6, distance:800.0, type: "C2"})
graph.addEdge(getNodeByName("C2-El Motorista"), getNodeByName("C2-Rotonda 6"), {time: 1.9, distance:950.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Rotonda 6"), getNodeByName("C2-Rotonda 4"), {time: 2.8, distance:1400.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Rotonda 4"), getNodeByName("C2-Timanfaya"), {time: 1.4, distance:700.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Timanfaya"), getNodeByName("C2-Parque Vallesequillo"), {time: 2.2, distance:1100.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Parque Vallesequillo"), getNodeByName("C2-El Portal"), {time: 2.6, distance:1300.0, type: "C2"})
graph.addEdge(getNodeByName("C2-El Portal"), getNodeByName("C2-Hospital FREMAP"), {time: 1.2, distance:600.0, type: "C2"})
graph.addEdge(getNodeByName("C2-Hospital FREMAP"), getNodeByName("C2-UPACE"), {time: 1.3, distance:650.0, type: "C2"})
graph.addEdge(getNodeByName("C2-UPACE"), getNodeByName("C2-Puertas del Sur"), {time: 1, distance:550, type: "C2"})



graph.addEdge(getNodeByName("C3-Cuatro Caminos"), getNodeByName("C3-Puerta de Rota"), {time: 1, distance:550, type: "C3"})
graph.addEdge(getNodeByName("C3-Puerta de Rota"), getNodeByName("C3-Luis Vives"), {time: 0.8, distance:400.0, type: "C3"})
graph.addEdge(getNodeByName("C3-Luis Vives"), getNodeByName("C3-Santiago"), {time: 0.8, distance:400.0, type: "C3"})
graph.addEdge(getNodeByName("C3-Santiago"), getNodeByName("C3-Porvera"), {time: 0.7, distance:350.0, type: "C3"})
graph.addEdge(getNodeByName("C3-Porvera"), getNodeByName("C3-Alameda Cristina"), {time: 0.6, distance:300.0, type: "C3"})
graph.addEdge(getNodeByName("C3-Alameda Cristina"), getNodeByName("C3-Sevilla"), {time: 0.9, distance:450.0, type: "C3"})
graph.addEdge(getNodeByName("C3-Sevilla"), getNodeByName("C3-Catavinos"), {time: 1.8, distance:900.0, type: "C3"})
graph.addEdge(getNodeByName("C3-Catavinos"), getNodeByName("C3-Minotauro"), {time: 1.8, distance:900.0, type: "C3"})
graph.addEdge(getNodeByName("C3-Minotauro"), getNodeByName("C3-Madre de Dios"), {time: 0.5, distance:240.0, type: "C3"})
graph.addEdge(getNodeByName("C3-Madre de Dios"), getNodeByName("C3-San Telmo"), {time: 0.9, distance:450.0, type: "C3"})
graph.addEdge(getNodeByName("C3-San Telmo"), getNodeByName("C3-Plaza del Carbon"), {time: 1.2, distance:600.0, type: "C3"})
graph.addEdge(getNodeByName("C3-Plaza del Carbon"), getNodeByName("C3-Cuatro Caminos"), {time: 1.0, distance:500.0, type: "C3"})



graph.addEdge(getNodeByName("C4-Cuatro Caminos"), getNodeByName("C4-Plaza del Carbon"), {time: 1.0, distance:500.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Plaza del Carbon"), getNodeByName("C4-San Telmo"), {time: 1.2, distance:600.0, type: "C4"})
graph.addEdge(getNodeByName("C4-San Telmo"), getNodeByName("C4-Madre de Dios"), {time: 0.9, distance:450.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Madre de Dios"), getNodeByName("C4-Minotauro"), {time: 0.5, distance:240.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Minotauro"), getNodeByName("C4-Catavinos"), {time: 1.8, distance:900.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Catavinos"), getNodeByName("C4-Sevilla"), {time: 1.8, distance:900.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Sevilla"), getNodeByName("C4-Alameda Cristina"), {time: 0.9, distance:450.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Alameda Cristina"), getNodeByName("C4-Porvera"), {time: 0.6, distance:300.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Porvera"), getNodeByName("C4-Santiago"), {time: 0.7, distance:350.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Santiago"), getNodeByName("C4-Luis Vives"), {time: 0.8, distance:400.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Luis Vives"), getNodeByName("C4-Puerta de Rota"), {time: 0.8, distance:400.0, type: "C4"})
graph.addEdge(getNodeByName("C4-Puerta de Rota"), getNodeByName("C4-Cuatro Caminos"), {time: 1, distance:550, type: "C4"})



graph.addEdge(getNodeByName("C5-Circunvalacion"), getNodeByName("C5-Federico Garcia Lorca"), {time: 1.4, distance:700, type: "C5"})
graph.addEdge(getNodeByName("C5-Federico Garcia Lorca"), getNodeByName("C5-El Almendral"), {time: 0.7, distance:350, type: "C5"})
graph.addEdge(getNodeByName("C5-El Almendral"), getNodeByName("C5-Hontoria"), {time: 1.1, distance:550, type: "C5"})
graph.addEdge(getNodeByName("C5-Hontoria"), getNodeByName("C5-IFECA"), {time: 0.7, distance:350, type: "C5"})
graph.addEdge(getNodeByName("C5-IFECA"), getNodeByName("C5-Feria"), {time: 0.9, distance:450, type: "C5"})
graph.addEdge(getNodeByName("C5-Feria"), getNodeByName("C5-Catavinos"), {time: 1.3, distance:650, type: "C5"})
graph.addEdge(getNodeByName("C5-Catavinos"), getNodeByName("C5-Minotauro"), {time: 1.8, distance:900, type: "C5"})
graph.addEdge(getNodeByName("C5-Minotauro"), getNodeByName("C5-Medina Sidonia"), {time: 1.2, distance:600, type: "C5"})
graph.addEdge(getNodeByName("C5-Medina Sidonia"), getNodeByName("C5-Parque Vallesequillo"), {time: 1.2, distance:600, type: "C5"})
graph.addEdge(getNodeByName("C5-Parque Vallesequillo"), getNodeByName("C5-Medina Sidonia"), {time: 1.2, distance:600, type: "C5"})
graph.addEdge(getNodeByName("C5-Medina Sidonia"), getNodeByName("C5-Minotauro"), {time: 1.2, distance:600, type: "C5"})
graph.addEdge(getNodeByName("C5-Minotauro"), getNodeByName("C5-Catavinos"), {time: 1.8, distance:900, type: "C5"})
graph.addEdge(getNodeByName("C5-Catavinos"), getNodeByName("C5-Feria"), {time: 1.3, distance:650, type: "C5"})
graph.addEdge(getNodeByName("C5-Feria"), getNodeByName("C5-IFECA"), {time: 0.9, distance:450, type: "C5"})
graph.addEdge(getNodeByName("C5-IFECA"), getNodeByName("C5-Hontoria"), {time: 0.7, distance:350, type: "C5"})
graph.addEdge(getNodeByName("C5-Hontoria"), getNodeByName("C5-El Almendral"), {time: 1.1, distance:550, type: "C5"})
graph.addEdge(getNodeByName("C5-El Almendral"), getNodeByName("C5-Federico Garcia Lorca"), {time: 0.7, distance:350, type: "C5"})
graph.addEdge(getNodeByName("C5-Federico Garcia Lorca"), getNodeByName("C5-Circunvalacion"), {time: 1.4, distance:700, type: "C5"})



graph.addEdge(getNodeByName("E1-Parque Vallesequillo"), getNodeByName("E1-Vallesequillo"), {time: 1.1, distance:550, type: "E1"})
graph.addEdge(getNodeByName("E1-Vallesequillo"), getNodeByName("E1-Madre de Dios"), {time: 1.2, distance:600, type: "E1"})
graph.addEdge(getNodeByName("E1-Madre de Dios"), getNodeByName("E1-Vallesequillo"), {time: 1.2, distance:600, type: "E1"})
graph.addEdge(getNodeByName("E1-Vallesequillo"), getNodeByName("E1-Parque Vallesequillo"), {time: 1.1, distance:550, type: "E1"})



graph.addEdge(getNodeByName("E2-El Portal"), getNodeByName("E2-Moreno Mendoza"), {time: 1.2, distance:600, type: "E2"})
graph.addEdge(getNodeByName("E2-Moreno Mendoza"), getNodeByName("E2-Diego de Cadiz"), {time: 1.2, distance:600, type: "E2"})
graph.addEdge(getNodeByName("E2-Diego de Cadiz"), getNodeByName("E2-Ronda de San Telmo"), {time: 0.52, distance:260, type: "E2"})
graph.addEdge(getNodeByName("E2-Ronda de San Telmo"), getNodeByName("E2-Azorin"), {time: 1.1, distance:550, type: "E2"})
graph.addEdge(getNodeByName("E2-Azorin"), getNodeByName("E2-Consejo de Europa"), {time: 1.2, distance:600, type: "E2"})
graph.addEdge(getNodeByName("E2-Consejo de Europa"), getNodeByName("E2-Caparros"), {time: 1.1, distance:550, type: "E2"})
graph.addEdge(getNodeByName("E2-Caparros"), getNodeByName("E2-La igualdad"), {time: 0.7, distance:350, type: "E2"})
graph.addEdge(getNodeByName("E2-La igualdad"), getNodeByName("E2-Hospital FREMAP"), {time: 0.7, distance:350, type: "E2"})
graph.addEdge(getNodeByName("E2-Hospital FREMAP"), getNodeByName("E2-El Portal"), {time: 1.1, distance:550, type: "E2"})



graph.addEdge(getNodeByName("E3-UPACE"), getNodeByName("E3-Av. de Italia"), {time: 1, distance:500, type: "E3"})
graph.addEdge(getNodeByName("E3-Av. de Italia"), getNodeByName("E3-Finlandia"), {time: 1.4, distance:700, type: "E3"})
graph.addEdge(getNodeByName("E3-Finlandia"), getNodeByName("E3-UPACE"), {time: 1.2, distance:600, type: "E3"})



graph.addEdge(getNodeByName("E4-Santiago"), getNodeByName("E4-Zoo"), {time: 1.1, distance:550.0, type: "E4"})
graph.addEdge(getNodeByName("E4-Zoo"), getNodeByName("E4-Rocio"), {time: 0.6, distance:300.0, type: "E4"})
graph.addEdge(getNodeByName("E4-Rocio"), getNodeByName("E4-San Juan de Dios"), {time: 0.6, distance:290.0, type: "E4"})
graph.addEdge(getNodeByName("E4-San Juan de Dios"), getNodeByName("E4-Luz Shopping (i)"), {time: 2.0, distance:1000.0, type: "E4"})
graph.addEdge(getNodeByName("E4-Luz Shopping (i)"), getNodeByName("E4-Luz Shopping (ii)"), {time: 0.9, distance:450.0, type: "E4"})
graph.addEdge(getNodeByName("E4-Luz Shopping (ii)"), getNodeByName("E4-Area Sur"), {time: 0.9, distance:450.0, type: "E4"})
graph.addEdge(getNodeByName("E4-Area Sur"), getNodeByName("E4-San Juan de Dios"), {time: 1.4, distance:700.0, type: "E4"})
graph.addEdge(getNodeByName("E4-San Juan de Dios"), getNodeByName("E4-Rocio"), {time: 0.6, distance:290.0, type: "E4"})
graph.addEdge(getNodeByName("E4-Rocio"), getNodeByName("E4-Zoo"), {time: 0.6, distance:300.0, type: "E4"})
graph.addEdge(getNodeByName("E4-Zoo"), getNodeByName("E4-Santiago"), {time: 1.1, distance:550.0, type: "E4"})



graph.addEdge(getNodeByName("E5-La Plata"), getNodeByName("E5-La Union"), {time: 1.1, distance:550, type: "E5"})
graph.addEdge(getNodeByName("E5-La Union"), getNodeByName("E5-Plaza de las Marinas"), {time: 0.6, distance:300, type: "E5"})
graph.addEdge(getNodeByName("E5-Plaza de las Marinas"), getNodeByName("E5-Federico Garcia Lorca"), {time: 0.8, distance:400, type: "E5"})
graph.addEdge(getNodeByName("E5-Federico Garcia Lorca"), getNodeByName("E5-Av. del Tamarix"), {time: 0.9, distance:450, type: "E5"})
graph.addEdge(getNodeByName("E5-Av. del Tamarix"), getNodeByName("E5-Donantes de Sangre"), {time: 0.7, distance:350, type: "E5"})
graph.addEdge(getNodeByName("E5-Donantes de Sangre"), getNodeByName("E5-Albariza"), {time: 0.7, distance:350, type: "E5"})
graph.addEdge(getNodeByName("E5-Albariza"), getNodeByName("E5-Av. Andalucia"), {time: 1.1, distance:550, type: "E5"})
graph.addEdge(getNodeByName("E5-Av. Andalucia"), getNodeByName("E5-El Altillo"), {time: 0.6, distance:300, type: "E5"})
graph.addEdge(getNodeByName("E5-El Altillo"), getNodeByName("E5-Av. Andalucia"), {time: 0.6, distance:300, type: "E5"})
graph.addEdge(getNodeByName("E5-Av. Andalucia"), getNodeByName("E5-Albariza"), {time: 1.1, distance:550, type: "E5"})
graph.addEdge(getNodeByName("E5-Albariza"), getNodeByName("E5-Donantes de Sangre"), {time: 0.7, distance:350, type: "E5"})
graph.addEdge(getNodeByName("E5-Donantes de Sangre"), getNodeByName("E5-Av. del Tamarix"), {time: 0.7, distance:350, type: "E5"})
graph.addEdge(getNodeByName("E5-Av. del Tamarix"), getNodeByName("E5-Federico Garcia Lorca"), {time: 0.9, distance:450, type: "E5"})
graph.addEdge(getNodeByName("E5-Federico Garcia Lorca"), getNodeByName("E5-Plaza de las Marinas"), {time: 0.8, distance:400, type: "E5"})
graph.addEdge(getNodeByName("E5-Plaza de las Marinas"), getNodeByName("E5-La Union"), {time: 0.6, distance:300, type: "E5"})
graph.addEdge(getNodeByName("E5-La Union"), getNodeByName("E5-La Plata"), {time: 1.1, distance:550, type: "E5"})



graph.addEdge(getNodeByName("E6-Corte Ingles"), getNodeByName("E6-La Pepa"), {time: 0.6, distance:300, type: "E6"})
graph.addEdge(getNodeByName("E6-La Pepa"), getNodeByName("E6-San Jose Obrero"), {time: 1.4, distance:700, type: "E6"})
graph.addEdge(getNodeByName("E6-San Jose Obrero"), getNodeByName("E6-Setefilla"), {time: 1, distance:500, type: "E6"})
graph.addEdge(getNodeByName("E6-Setefilla"), getNodeByName("E6-Manuel F. Cruz"), {time: 0.8, distance:400, type: "E6"})
graph.addEdge(getNodeByName("E6-Manuel F. Cruz"), getNodeByName("E6-Av. La Granja"), {time: 0.9, distance:450, type: "E6"})
graph.addEdge(getNodeByName("E6-Av. La Granja"), getNodeByName("E6-Almunia"), {time: 1.2, distance:600, type: "E6"})
graph.addEdge(getNodeByName("E6-Almunia"), getNodeByName("E6-Afanas"), {time: 1, distance:500, type: "E6"})
graph.addEdge(getNodeByName("E6-Afanas"), getNodeByName("E6-La Marquesa"), {time: 0.58, distance:290, type: "E6"})
graph.addEdge(getNodeByName("E6-La Marquesa"), getNodeByName("E6-Rotonda 6"), {time: 1.3, distance:650, type: "E6"})
graph.addEdge(getNodeByName("E6-Rotonda 6"), getNodeByName("E6-La Marquesa"), {time: 1.3, distance:650, type: "E6"})
graph.addEdge(getNodeByName("E6-La Marquesa"), getNodeByName("E6-Afanas"), {time: 0.58, distance:290, type: "E6"})
graph.addEdge(getNodeByName("E6-Afanas"), getNodeByName("E6-Caulina"), {time: 0.8, distance:400, type: "E6"})
graph.addEdge(getNodeByName("E6-Caulina"), getNodeByName("E6-Ctra. Guadalcacin"), {time: 1, distance:500, type: "E6"})
graph.addEdge(getNodeByName("E6-Ctra. Guadalcacin"), getNodeByName("E6-Setefilla"), {time: 1.4, distance:700, type: "E6"})
graph.addEdge(getNodeByName("E6-Setefilla"), getNodeByName("E6-San Jose Obrero"), {time: 1, distance:500, type: "E6"})
graph.addEdge(getNodeByName("E6-San Jose Obrero"), getNodeByName("E6-La Pepa"), {time: 1.4, distance:700, type: "E6"})
graph.addEdge(getNodeByName("E6-La Pepa"), getNodeByName("E6-Corte Ingles"), {time: 0.6, distance:300, type: "E6"})



graph.addEdge(getNodeByName("E7-Av. Europa"), getNodeByName("E7-Palacio Municipal de Deportes"), {time: 0.8, distance:400, type: "E7"})
graph.addEdge(getNodeByName("E7-Palacio Municipal de Deportes"), getNodeByName("E7-Lola Flores"), {time: 1, distance:500, type: "E7"})
graph.addEdge(getNodeByName("E7-Lola Flores"), getNodeByName("E7-Biarritz"), {time: 0.54, distance:270, type: "E7"})
graph.addEdge(getNodeByName("E7-Biarritz"), getNodeByName("E7-Olivar de Rivero"), {time: 0.7, distance:350, type: "E7"})
graph.addEdge(getNodeByName("E7-Olivar de Rivero"), getNodeByName("E7-La Pita"), {time: 1.5, distance:750, type: "E7"})
graph.addEdge(getNodeByName("E7-La Pita"), getNodeByName("E7-Rotonda 6"), {time: 0.6, distance:300, type: "E7"})
graph.addEdge(getNodeByName("E7-Rotonda 6"), getNodeByName("E7-Av. Taginaste"), {time: 1.3, distance:650, type: "E7"})
graph.addEdge(getNodeByName("E7-Av. Taginaste"), getNodeByName("E7-Ciudad de los Ninos"), {time: 1.3, distance:650, type: "E7"})
graph.addEdge(getNodeByName("E7-Ciudad de los Ninos"), getNodeByName("E7-Biarritz"), {time: 1, distance:500, type: "E7"})
graph.addEdge(getNodeByName("E7-Biarritz"), getNodeByName("E7-Lola Flores"), {time: 0.54, distance:270, type: "E7"})
graph.addEdge(getNodeByName("E7-Lola Flores"), getNodeByName("E7-Palacio Municipal de Deportes"), {time: 1, distance:500, type: "E7"})
graph.addEdge(getNodeByName("E7-Palacio Municipal de Deportes"), getNodeByName("E7-Av. Europa"), {time: 0.8, distance:400, type: "E7"})



graph.addEdge(getNodeByName("E8-El Retiro"), getNodeByName("E8-Parque Atlantico"), {time: 0.7, distance:350, type: "E8"})
graph.addEdge(getNodeByName("E8-Parque Atlantico"), getNodeByName("E8-Club Nazaret"), {time: 0.8, distance:400, type: "E8"})
graph.addEdge(getNodeByName("E8-Club Nazaret"), getNodeByName("E8-Av. Nazaret"), {time: 1.1, distance:550, type: "E8"})
graph.addEdge(getNodeByName("E8-Av. Nazaret"), getNodeByName("E8-Rotonda 4"), {time: 1, distance:500, type: "E8"})
graph.addEdge(getNodeByName("E8-Rotonda 4"), getNodeByName("E8-La Canaleja"), {time: 1, distance:500, type: "E8"})
graph.addEdge(getNodeByName("E8-La Canaleja"), getNodeByName("E8-Las Delicias"), {time: 1.4, distance:700, type: "E8"})
graph.addEdge(getNodeByName("E8-Las Delicias"), getNodeByName("E8-Plaza Macedonia"), {time: 0.7, distance:350, type: "E8"})
graph.addEdge(getNodeByName("E8-Plaza Macedonia"), getNodeByName("E8-Tartessos"), {time: 1.1, distance:550, type: "E8"})
graph.addEdge(getNodeByName("E8-Tartessos"), getNodeByName("E8-Parque Atlantico"), {time: 0.7, distance:350, type: "E8"})
graph.addEdge(getNodeByName("E8-Parque Atlantico"), getNodeByName("E8-El Retiro"), {time: 0.7, distance:350, type: "E8"})



graph.addEdge(getNodeByName("L1-El Portal"), getNodeByName("L1-Diego de Cadiz"), {time: 0.7, distance:350, type: "L1"})
graph.addEdge(getNodeByName("L1-Diego de Cadiz"), getNodeByName("L1-Ronda de San Telmo"), {time: 0.52, distance:260, type: "L1"})
graph.addEdge(getNodeByName("L1-Ronda de San Telmo"), getNodeByName("L1-San Telmo"), {time: 0.7, distance:350, type: "L1"})
graph.addEdge(getNodeByName("L1-San Telmo"), getNodeByName("L1-Ronda de San Telmo"), {time: 0.8, distance:400, type: "L1"})
graph.addEdge(getNodeByName("L1-Ronda de San Telmo"), getNodeByName("L1-Diego de Cadiz"), {time: 0.52, distance:260, type: "L1"})
graph.addEdge(getNodeByName("L1-Diego de Cadiz"), getNodeByName("L1-El Portal"), {time: 0.7, distance:350, type: "L1"})



graph.addEdge(getNodeByName("L2-El Portal"), getNodeByName("L2-Blas Infante"), {time: 1, distance:500, type: "L2"})
graph.addEdge(getNodeByName("L2-Blas Infante"), getNodeByName("L2-La Juventud"), {time: 1.1, distance:550, type: "L2"})
graph.addEdge(getNodeByName("L2-La Juventud"), getNodeByName("L2-Consejo de Europa"), {time: 0.5, distance:250, type: "L2"})
graph.addEdge(getNodeByName("L2-Consejo de Europa"), getNodeByName("L2-Cuatro Caminos"), {time: 0.6, distance:300, type: "L2"})
graph.addEdge(getNodeByName("L2-Cuatro Caminos"), getNodeByName("L2-Consejo de Europa"), {time: 0.6, distance:300, type: "L2"})
graph.addEdge(getNodeByName("L2-Consejo de Europa"), getNodeByName("L2-La Juventud"), {time: 0.5, distance:250, type: "L2"})
graph.addEdge(getNodeByName("L2-La Juventud"), getNodeByName("L2-Blas Infante"), {time: 1.1, distance:550, type: "L2"})
graph.addEdge(getNodeByName("L2-Blas Infante"), getNodeByName("L2-El Portal"), {time: 1, distance:500, type: "L2"})



graph.addEdge(getNodeByName("L3-Hospital"), getNodeByName("L3-La Plata"), {time: 1.8, distance:900, type: "L3"})
graph.addEdge(getNodeByName("L3-La Plata"), getNodeByName("L3-Santiago"), {time: 1.5, distance:750, type: "L3"})
graph.addEdge(getNodeByName("L3-Santiago"), getNodeByName("L3-La Plata"), {time: 1.5, distance:750, type: "L3"})
graph.addEdge(getNodeByName("L3-La Plata"), getNodeByName("L3-Hospital"), {time: 1.8, distance:900, type: "L3"})



graph.addEdge(getNodeByName("L4-Alameda Cristina"), getNodeByName("L4-Sevilla"), {time: 0.9, distance:450, type: "L4"})
graph.addEdge(getNodeByName("L4-Sevilla"), getNodeByName("L4-Escuela de Arte Ecuestre"), {time: 0.7, distance:350, type: "L4"})
graph.addEdge(getNodeByName("L4-Escuela de Arte Ecuestre"), getNodeByName("L4-Duque de Abrantes"), {time: 0.9, distance:450, type: "L4"})
graph.addEdge(getNodeByName("L4-Duque de Abrantes"), getNodeByName("L4-El Almendral"), {time: 1.3, distance:650, type: "L4"})
graph.addEdge(getNodeByName("L4-El Almendral"), getNodeByName("L4-Donantes de Sangre"), {time: 0.8, distance:400, type: "L4"})
graph.addEdge(getNodeByName("L4-Donantes de Sangre"), getNodeByName("L4-Las Buganvillas"), {time: 1, distance:500, type: "L4"})
graph.addEdge(getNodeByName("L4-Las Buganvillas"), getNodeByName("L4-Donantes de Sangre"), {time: 1, distance:500, type: "L4"})
graph.addEdge(getNodeByName("L4-Donantes de Sangre"), getNodeByName("L4-El Almendral"), {time: 0.8, distance:400, type: "L4"})
graph.addEdge(getNodeByName("L4-El Almendral"), getNodeByName("L4-Duque de Abrantes"), {time: 1.3, distance:650, type: "L4"})
graph.addEdge(getNodeByName("L4-Duque de Abrantes"), getNodeByName("L4-Escuela de Arte Ecuestre"), {time: 0.9, distance:450, type: "L4"})
graph.addEdge(getNodeByName("L4-Escuela de Arte Ecuestre"), getNodeByName("L4-Sevilla"), {time: 0.7, distance:350, type: "L4"})
graph.addEdge(getNodeByName("L4-Sevilla"), getNodeByName("L4-Alameda Cristina"), {time: 0.9, distance:450, type: "L4"})



graph.addEdge(getNodeByName("L5-Alameda Cristina"), getNodeByName("L5-Sevilla"), {time: 0.9, distance:450, type: "L5"})
graph.addEdge(getNodeByName("L5-Sevilla"), getNodeByName("L5-Plaza del Caballo"), {time: 1.2, distance:600, type: "L5"})
graph.addEdge(getNodeByName("L5-Plaza del Caballo"), getNodeByName("L5-Hontoria"), {time: 1.4, distance:700, type: "L5"})
graph.addEdge(getNodeByName("L5-Hontoria"), getNodeByName("L5-Av. Andalucia"), {time: 1.1, distance:550, type: "L5"})
graph.addEdge(getNodeByName("L5-Av. Andalucia"), getNodeByName("L5-Corte Ingles"), {time: 1.7, distance:850, type: "L5"})
graph.addEdge(getNodeByName("L5-Corte Ingles"), getNodeByName("L5-Pozo Albero"), {time: 1.8, distance:900, type: "L5"})
graph.addEdge(getNodeByName("L5-Pozo Albero"), getNodeByName("L5-Corte Ingles"), {time: 1.8, distance:900, type: "L5"})
graph.addEdge(getNodeByName("L5-Corte Ingles"), getNodeByName("L5-Av. Andalucia"), {time: 1.7, distance:850, type: "L5"})
graph.addEdge(getNodeByName("L5-Av. Andalucia"), getNodeByName("L5-Hontoria"), {time: 1.1, distance:550, type: "L5"})
graph.addEdge(getNodeByName("L5-Hontoria"), getNodeByName("L5-Plaza del Caballo"), {time: 1.4, distance:700, type: "L5"})
graph.addEdge(getNodeByName("L5-Plaza del Caballo"), getNodeByName("L5-Sevilla"), {time: 1.2, distance:600, type: "L5"})
graph.addEdge(getNodeByName("L5-Sevilla"), getNodeByName("L5-Alameda Cristina"), {time: 0.9, distance:450, type: "L5"})



graph.addEdge(getNodeByName("L6-Hontoria"), getNodeByName("L6-IFECA"), {time: 0.7, distance:350, type: "L6"})
graph.addEdge(getNodeByName("L6-IFECA"), getNodeByName("L6-Av. Europa"), {time: 1.4, distance:700, type: "L6"})
graph.addEdge(getNodeByName("L6-Av. Europa"), getNodeByName("L6-La Granja"), {time: 1.7, distance:850, type: "L6"})
graph.addEdge(getNodeByName("L6-La Granja"), getNodeByName("L6-Av. La Granja"), {time: 0.9, distance:450, type: "L6"})
graph.addEdge(getNodeByName("L6-Av. La Granja"), getNodeByName("L6-Ctra. Guadalcacin"), {time: 0.8, distance:400, type: "L6"})
graph.addEdge(getNodeByName("L6-Ctra. Guadalcacin"), getNodeByName("L6-Av. La Granja"), {time: 0.8, distance:400, type: "L6"})
graph.addEdge(getNodeByName("L6-Av. La Granja"), getNodeByName("L6-La Granja"), {time: 0.9, distance:450, type: "L6"})
graph.addEdge(getNodeByName("L6-La Granja"), getNodeByName("L6-Av. Europa"), {time: 1.7, distance:850, type: "L6"})
graph.addEdge(getNodeByName("L6-Av. Europa"), getNodeByName("L6-IFECA"), {time: 1.4, distance:700, type: "L6"})
graph.addEdge(getNodeByName("L6-IFECA"), getNodeByName("L6-Hontoria"), {time: 0.7, distance:350, type: "L6"})



graph.addEdge(getNodeByName("L7-Villamarta"), getNodeByName("L7-Arcos"), {time: 1.1, distance:550, type: "L7"})
graph.addEdge(getNodeByName("L7-Arcos"), getNodeByName("L7-Chapin"), {time: 1.6, distance:800, type: "L7"})
graph.addEdge(getNodeByName("L7-Chapin"), getNodeByName("L7-Universidad"), {time: 1, distance:500, type: "L7"})
graph.addEdge(getNodeByName("L7-Universidad"), getNodeByName("L7-Biarritz"), {time: 1.2, distance:600, type: "L7"})
graph.addEdge(getNodeByName("L7-Biarritz"), getNodeByName("L7-Ciudad de los Ninos"), {time: 1.2, distance:600, type: "L7"})
graph.addEdge(getNodeByName("L7-Ciudad de los Ninos"), getNodeByName("L7-El Motorista"), {time: 1, distance:500, type: "L7"})
graph.addEdge(getNodeByName("L7-El Motorista"), getNodeByName("L7-Almunia"), {time: 0.8, distance:400, type: "L7"})
graph.addEdge(getNodeByName("L7-Almunia"), getNodeByName("L7-Caulina"), {time: 0.7, distance:350, type: "L7"})
graph.addEdge(getNodeByName("L7-Caulina"), getNodeByName("L7-Almunia"), {time: 0.8, distance:400, type: "L7"})
graph.addEdge(getNodeByName("L7-Almunia"), getNodeByName("L7-El Motorista"), {time: 0.8, distance:400, type: "L7"})
graph.addEdge(getNodeByName("L7-El Motorista"), getNodeByName("L7-Ciudad de los Ninos"), {time: 1, distance:500, type: "L7"})
graph.addEdge(getNodeByName("L7-Ciudad de los Ninos"), getNodeByName("L7-Biarritz"), {time: 1.2, distance:600, type: "L7"})
graph.addEdge(getNodeByName("L7-Biarritz"), getNodeByName("L7-Universidad"), {time: 1.2, distance:600, type: "L7"})
graph.addEdge(getNodeByName("L7-Universidad"), getNodeByName("L7-Chapin"), {time: 1, distance:500, type: "L7"})
graph.addEdge(getNodeByName("L7-Chapin"), getNodeByName("L7-Arcos"), {time: 1.6, distance:800, type: "L7"})
graph.addEdge(getNodeByName("L7-Arcos"), getNodeByName("L7-Minotauro"), {time: 1.2, distance:600, type: "L7"})
graph.addEdge(getNodeByName("L7-Minotauro"), getNodeByName("L7-Villamarta"), {time: 1.6, distance:800, type: "L7"})



graph.addEdge(getNodeByName("L8-Villamarta"), getNodeByName("L8-Minotauro"), {time: 2.4, distance:1200, type: "L8"})
graph.addEdge(getNodeByName("L8-Minotauro"), getNodeByName("L8-El Retiro"), {time: 1.5, distance:750, type: "L8"})
graph.addEdge(getNodeByName("L8-El Retiro"), getNodeByName("L8-La Consolacion"), {time: 0.9, distance:450, type: "L8"})
graph.addEdge(getNodeByName("L8-La Consolacion"), getNodeByName("L8-Las Delicias"), {time: 0.8, distance:400, type: "L8"})
graph.addEdge(getNodeByName("L8-Las Delicias"), getNodeByName("L8-La Pita"), {time: 2, distance:1000, type: "L8"})
graph.addEdge(getNodeByName("L8-La Pita"), getNodeByName("L8-Rotonda 6"), {time: 0.7, distance:350, type: "L8"})
graph.addEdge(getNodeByName("L8-Rotonda 6"), getNodeByName("L8-Cementerio"), {time: 0.7, distance:350, type: "L8"})
graph.addEdge(getNodeByName("L8-Cementerio"), getNodeByName("L8-Rotonda 6"), {time: 0.7, distance:350, type: "L8"})
graph.addEdge(getNodeByName("L8-Rotonda 6"), getNodeByName("L8-La Pita"), {time: 0.7, distance:350, type: "L8"})
graph.addEdge(getNodeByName("L8-La Pita"), getNodeByName("L8-Las Delicias"), {time: 2, distance:1000, type: "L8"})
graph.addEdge(getNodeByName("L8-Las Delicias"), getNodeByName("L8-La Consolacion"), {time: 0.8, distance:400, type: "L8"})
graph.addEdge(getNodeByName("L8-La Consolacion"), getNodeByName("L8-El Retiro"), {time: 0.9, distance:450, type: "L8"})
graph.addEdge(getNodeByName("L8-El Retiro"), getNodeByName("L8-Minotauro"), {time: 1.5, distance:750, type: "L8"})
graph.addEdge(getNodeByName("L8-Minotauro"), getNodeByName("L8-Villamarta"), {time: 1.6, distance:800, type: "L8"})



graph.addEdge(getNodeByName("LT-Alameda Cristina"), getNodeByName("LT-Gallo Azul"), {time: 0.96, distance:400, type: "LT"})
graph.addEdge(getNodeByName("LT-Gallo Azul"), getNodeByName("LT-Arenal"), {time: 0.48, distance:200, type: "LT"})
graph.addEdge(getNodeByName("LT-Arenal"), getNodeByName("LT-Alameda Vieja"), {time: 0.48, distance:200, type: "LT"})
graph.addEdge(getNodeByName("LT-Alameda Vieja"), getNodeByName("LT-Cuatro Caminos"), {time: 1.08, distance:450, type: "LT"})
graph.addEdge(getNodeByName("LT-Cuatro Caminos"), getNodeByName("LT-Puertas del Sur"), {time: 1.5, distance:750, type: "LT"})
graph.addEdge(getNodeByName("LT-Puertas del Sur"), getNodeByName("LT-Cuatro Caminos"), {time: 1.5, distance:750, type: "LT"})
graph.addEdge(getNodeByName("LT-Cuatro Caminos"), getNodeByName("LT-Alameda Vieja"), {time: 1.08, distance:450, type: "LT"})
graph.addEdge(getNodeByName("LT-Alameda Vieja"), getNodeByName("LT-Gallo Azul"), {time: 0.48, distance:200, type: "LT"})
graph.addEdge(getNodeByName("LT-Gallo Azul"), getNodeByName("LT-Arenal"), {time: 0.48, distance:200, type: "LT"})
graph.addEdge(getNodeByName("LT-Arenal"), getNodeByName("LT-Alameda Cristina"), {time: 0.96, distance:400, type: "LT"})

graph.addEdge(getNodeByName("C3-Alameda Cristina"), getNodeByName("C4-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Alameda Cristina"), getNodeByName("L4-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Alameda Cristina"), getNodeByName("L5-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Alameda Cristina"), getNodeByName("LT-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Alameda Cristina"), getNodeByName("C3-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Alameda Cristina"), getNodeByName("L4-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Alameda Cristina"), getNodeByName("L5-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Alameda Cristina"), getNodeByName("LT-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Alameda Cristina"), getNodeByName("C3-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Alameda Cristina"), getNodeByName("C4-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Alameda Cristina"), getNodeByName("L5-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Alameda Cristina"), getNodeByName("LT-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Alameda Cristina"), getNodeByName("C3-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Alameda Cristina"), getNodeByName("C4-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Alameda Cristina"), getNodeByName("L4-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Alameda Cristina"), getNodeByName("LT-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("LT-Alameda Cristina"), getNodeByName("C3-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("LT-Alameda Cristina"), getNodeByName("C4-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("LT-Alameda Cristina"), getNodeByName("L4-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("LT-Alameda Cristina"), getNodeByName("L5-Alameda Cristina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Almunia"), getNodeByName("L7-Almunia"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-Almunia"), getNodeByName("E6-Almunia"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E5-Av. Andalucia"), getNodeByName("L5-Av. Andalucia"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Av. Andalucia"), getNodeByName("E5-Av. Andalucia"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E7-Av. Europa"), getNodeByName("L6-Av. Europa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L6-Av. Europa"), getNodeByName("E7-Av. Europa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Av. La Granja"), getNodeByName("L6-Av. La Granja"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L6-Av. La Granja"), getNodeByName("E6-Av. La Granja"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E7-Biarritz"), getNodeByName("L7-Biarritz"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-Biarritz"), getNodeByName("E7-Biarritz"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Catavinos"), getNodeByName("C4-Catavinos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Catavinos"), getNodeByName("C5-Catavinos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Catavinos"), getNodeByName("C3-Catavinos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Catavinos"), getNodeByName("C5-Catavinos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Catavinos"), getNodeByName("C3-Catavinos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Catavinos"), getNodeByName("C4-Catavinos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Caulina"), getNodeByName("L7-Caulina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-Caulina"), getNodeByName("E6-Caulina"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Circunvalacion"), getNodeByName("C2-Circunvalacion"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Circunvalacion"), getNodeByName("C5-Circunvalacion"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Circunvalacion"), getNodeByName("C1-Circunvalacion"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Circunvalacion"), getNodeByName("C5-Circunvalacion"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Circunvalacion"), getNodeByName("C1-Circunvalacion"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Circunvalacion"), getNodeByName("C2-Circunvalacion"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E7-Ciudad de los Ninos"), getNodeByName("L7-Ciudad de los Ninos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-Ciudad de los Ninos"), getNodeByName("E7-Ciudad de los Ninos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E2-Consejo de Europa"), getNodeByName("L2-Consejo de Europa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L2-Consejo de Europa"), getNodeByName("E2-Consejo de Europa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Corte Ingles"), getNodeByName("C2-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Corte Ingles"), getNodeByName("E6-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Corte Ingles"), getNodeByName("L5-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Corte Ingles"), getNodeByName("C1-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Corte Ingles"), getNodeByName("E6-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Corte Ingles"), getNodeByName("L5-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Corte Ingles"), getNodeByName("C1-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Corte Ingles"), getNodeByName("C2-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Corte Ingles"), getNodeByName("L5-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Corte Ingles"), getNodeByName("C1-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Corte Ingles"), getNodeByName("C2-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Corte Ingles"), getNodeByName("E6-Corte Ingles"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Ctra. Guadalcacin"), getNodeByName("L6-Ctra. Guadalcacin"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L6-Ctra. Guadalcacin"), getNodeByName("E6-Ctra. Guadalcacin"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Cuatro Caminos"), getNodeByName("C4-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Cuatro Caminos"), getNodeByName("L2-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Cuatro Caminos"), getNodeByName("LT-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Cuatro Caminos"), getNodeByName("C3-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Cuatro Caminos"), getNodeByName("L2-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Cuatro Caminos"), getNodeByName("LT-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L2-Cuatro Caminos"), getNodeByName("C3-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L2-Cuatro Caminos"), getNodeByName("C4-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L2-Cuatro Caminos"), getNodeByName("LT-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("LT-Cuatro Caminos"), getNodeByName("C3-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("LT-Cuatro Caminos"), getNodeByName("C4-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("LT-Cuatro Caminos"), getNodeByName("L2-Cuatro Caminos"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E2-Diego de Cadiz"), getNodeByName("L1-Diego de Cadiz"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L1-Diego de Cadiz"), getNodeByName("E2-Diego de Cadiz"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E5-Donantes de Sangre"), getNodeByName("L4-Donantes de Sangre"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Donantes de Sangre"), getNodeByName("E5-Donantes de Sangre"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-El Almendral"), getNodeByName("L4-El Almendral"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-El Almendral"), getNodeByName("C5-El Almendral"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-El Motorista"), getNodeByName("C2-El Motorista"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-El Motorista"), getNodeByName("L7-El Motorista"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-El Motorista"), getNodeByName("C1-El Motorista"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-El Motorista"), getNodeByName("L7-El Motorista"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-El Motorista"), getNodeByName("C1-El Motorista"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-El Motorista"), getNodeByName("C2-El Motorista"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-El Portal"), getNodeByName("C2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-El Portal"), getNodeByName("E2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-El Portal"), getNodeByName("L1-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-El Portal"), getNodeByName("L2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-El Portal"), getNodeByName("C1-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-El Portal"), getNodeByName("E2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-El Portal"), getNodeByName("L1-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-El Portal"), getNodeByName("L2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E2-El Portal"), getNodeByName("C1-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E2-El Portal"), getNodeByName("C2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E2-El Portal"), getNodeByName("L1-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E2-El Portal"), getNodeByName("L2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L1-El Portal"), getNodeByName("C1-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L1-El Portal"), getNodeByName("C2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L1-El Portal"), getNodeByName("E2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L1-El Portal"), getNodeByName("L2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L2-El Portal"), getNodeByName("C1-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L2-El Portal"), getNodeByName("C2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L2-El Portal"), getNodeByName("E2-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L2-El Portal"), getNodeByName("L1-El Portal"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E8-El Retiro"), getNodeByName("L8-El Retiro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-El Retiro"), getNodeByName("E8-El Retiro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Federico Garcia Lorca"), getNodeByName("E5-Federico Garcia Lorca"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E5-Federico Garcia Lorca"), getNodeByName("C5-Federico Garcia Lorca"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Hontoria"), getNodeByName("L5-Hontoria"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Hontoria"), getNodeByName("L6-Hontoria"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Hontoria"), getNodeByName("C5-Hontoria"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Hontoria"), getNodeByName("L6-Hontoria"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L6-Hontoria"), getNodeByName("C5-Hontoria"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L6-Hontoria"), getNodeByName("L5-Hontoria"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Hospital"), getNodeByName("C2-Hospital"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Hospital"), getNodeByName("L3-Hospital"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Hospital"), getNodeByName("C1-Hospital"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Hospital"), getNodeByName("L3-Hospital"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L3-Hospital"), getNodeByName("C1-Hospital"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L3-Hospital"), getNodeByName("C2-Hospital"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Hospital FREMAP"), getNodeByName("C2-Hospital FREMAP"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Hospital FREMAP"), getNodeByName("E2-Hospital FREMAP"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Hospital FREMAP"), getNodeByName("C1-Hospital FREMAP"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Hospital FREMAP"), getNodeByName("E2-Hospital FREMAP"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E2-Hospital FREMAP"), getNodeByName("C1-Hospital FREMAP"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E2-Hospital FREMAP"), getNodeByName("C2-Hospital FREMAP"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-IFECA"), getNodeByName("L6-IFECA"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L6-IFECA"), getNodeByName("C5-IFECA"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-La Granja"), getNodeByName("C2-La Granja"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-La Granja"), getNodeByName("L6-La Granja"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-La Granja"), getNodeByName("C1-La Granja"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-La Granja"), getNodeByName("L6-La Granja"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L6-La Granja"), getNodeByName("C1-La Granja"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L6-La Granja"), getNodeByName("C2-La Granja"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-La Pepa"), getNodeByName("C2-La Pepa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-La Pepa"), getNodeByName("E6-La Pepa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-La Pepa"), getNodeByName("C1-La Pepa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-La Pepa"), getNodeByName("E6-La Pepa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-La Pepa"), getNodeByName("C1-La Pepa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-La Pepa"), getNodeByName("C2-La Pepa"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E7-La Pita"), getNodeByName("L8-La Pita"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-La Pita"), getNodeByName("E7-La Pita"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E5-La Plata"), getNodeByName("L3-La Plata"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L3-La Plata"), getNodeByName("E5-La Plata"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Las Buganvillas"), getNodeByName("C2-Las Buganvillas"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Las Buganvillas"), getNodeByName("L4-Las Buganvillas"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Las Buganvillas"), getNodeByName("C1-Las Buganvillas"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Las Buganvillas"), getNodeByName("L4-Las Buganvillas"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Las Buganvillas"), getNodeByName("C1-Las Buganvillas"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Las Buganvillas"), getNodeByName("C2-Las Buganvillas"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E8-Las Delicias"), getNodeByName("L8-Las Delicias"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Las Delicias"), getNodeByName("E8-Las Delicias"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Luis Vives"), getNodeByName("C4-Luis Vives"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Luis Vives"), getNodeByName("C3-Luis Vives"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Madre de Dios"), getNodeByName("C4-Madre de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Madre de Dios"), getNodeByName("E1-Madre de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Madre de Dios"), getNodeByName("C3-Madre de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Madre de Dios"), getNodeByName("E1-Madre de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E1-Madre de Dios"), getNodeByName("C3-Madre de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E1-Madre de Dios"), getNodeByName("C4-Madre de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Minotauro"), getNodeByName("C4-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Minotauro"), getNodeByName("C5-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Minotauro"), getNodeByName("L7-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Minotauro"), getNodeByName("L8-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Minotauro"), getNodeByName("C3-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Minotauro"), getNodeByName("C5-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Minotauro"), getNodeByName("L7-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Minotauro"), getNodeByName("L8-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Minotauro"), getNodeByName("C3-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Minotauro"), getNodeByName("C4-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Minotauro"), getNodeByName("L7-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Minotauro"), getNodeByName("L8-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-Minotauro"), getNodeByName("C3-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-Minotauro"), getNodeByName("C4-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-Minotauro"), getNodeByName("C5-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-Minotauro"), getNodeByName("L8-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Minotauro"), getNodeByName("C3-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Minotauro"), getNodeByName("C4-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Minotauro"), getNodeByName("C5-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Minotauro"), getNodeByName("L7-Minotauro"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Parque Vallesequillo"), getNodeByName("C2-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Parque Vallesequillo"), getNodeByName("C5-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Parque Vallesequillo"), getNodeByName("E1-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Parque Vallesequillo"), getNodeByName("C1-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Parque Vallesequillo"), getNodeByName("C5-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Parque Vallesequillo"), getNodeByName("E1-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Parque Vallesequillo"), getNodeByName("C1-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Parque Vallesequillo"), getNodeByName("C2-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C5-Parque Vallesequillo"), getNodeByName("E1-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E1-Parque Vallesequillo"), getNodeByName("C1-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E1-Parque Vallesequillo"), getNodeByName("C2-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E1-Parque Vallesequillo"), getNodeByName("C5-Parque Vallesequillo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Picaduenas"), getNodeByName("C2-Picaduenas"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Picaduenas"), getNodeByName("C1-Picaduenas"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Plaza del Carbon"), getNodeByName("C4-Plaza del Carbon"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Plaza del Carbon"), getNodeByName("C3-Plaza del Carbon"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Porvera"), getNodeByName("C4-Porvera"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Porvera"), getNodeByName("C3-Porvera"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Puerta de Rota"), getNodeByName("C4-Puerta de Rota"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Puerta de Rota"), getNodeByName("C3-Puerta de Rota"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Puertas del Sur"), getNodeByName("C2-Puertas del Sur"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Puertas del Sur"), getNodeByName("LT-Puertas del Sur"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Puertas del Sur"), getNodeByName("C1-Puertas del Sur"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Puertas del Sur"), getNodeByName("LT-Puertas del Sur"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("LT-Puertas del Sur"), getNodeByName("C1-Puertas del Sur"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("LT-Puertas del Sur"), getNodeByName("C2-Puertas del Sur"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E2-Ronda de San Telmo"), getNodeByName("L1-Ronda de San Telmo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L1-Ronda de San Telmo"), getNodeByName("E2-Ronda de San Telmo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Rotonda 4"), getNodeByName("C2-Rotonda 4"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Rotonda 4"), getNodeByName("E8-Rotonda 4"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Rotonda 4"), getNodeByName("C1-Rotonda 4"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Rotonda 4"), getNodeByName("E8-Rotonda 4"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E8-Rotonda 4"), getNodeByName("C1-Rotonda 4"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E8-Rotonda 4"), getNodeByName("C2-Rotonda 4"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Rotonda 6"), getNodeByName("C2-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Rotonda 6"), getNodeByName("E6-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Rotonda 6"), getNodeByName("E7-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Rotonda 6"), getNodeByName("L8-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Rotonda 6"), getNodeByName("C1-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Rotonda 6"), getNodeByName("E6-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Rotonda 6"), getNodeByName("E7-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Rotonda 6"), getNodeByName("L8-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Rotonda 6"), getNodeByName("C1-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Rotonda 6"), getNodeByName("C2-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Rotonda 6"), getNodeByName("E7-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E6-Rotonda 6"), getNodeByName("L8-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E7-Rotonda 6"), getNodeByName("C1-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E7-Rotonda 6"), getNodeByName("C2-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E7-Rotonda 6"), getNodeByName("E6-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E7-Rotonda 6"), getNodeByName("L8-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Rotonda 6"), getNodeByName("C1-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Rotonda 6"), getNodeByName("C2-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Rotonda 6"), getNodeByName("E6-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Rotonda 6"), getNodeByName("E7-Rotonda 6"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-San Juan de Dios"), getNodeByName("C2-San Juan de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-San Juan de Dios"), getNodeByName("E4-San Juan de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-San Juan de Dios"), getNodeByName("C1-San Juan de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-San Juan de Dios"), getNodeByName("E4-San Juan de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E4-San Juan de Dios"), getNodeByName("C1-San Juan de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E4-San Juan de Dios"), getNodeByName("C2-San Juan de Dios"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-San Telmo"), getNodeByName("C4-San Telmo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-San Telmo"), getNodeByName("L1-San Telmo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-San Telmo"), getNodeByName("C3-San Telmo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-San Telmo"), getNodeByName("L1-San Telmo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L1-San Telmo"), getNodeByName("C3-San Telmo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L1-San Telmo"), getNodeByName("C4-San Telmo"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Santiago"), getNodeByName("C4-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Santiago"), getNodeByName("E4-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Santiago"), getNodeByName("L3-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Santiago"), getNodeByName("C3-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Santiago"), getNodeByName("E4-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Santiago"), getNodeByName("L3-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E4-Santiago"), getNodeByName("C3-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E4-Santiago"), getNodeByName("C4-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E4-Santiago"), getNodeByName("L3-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L3-Santiago"), getNodeByName("C3-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L3-Santiago"), getNodeByName("C4-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L3-Santiago"), getNodeByName("E4-Santiago"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Sevilla"), getNodeByName("C4-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Sevilla"), getNodeByName("L4-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C3-Sevilla"), getNodeByName("L5-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Sevilla"), getNodeByName("C3-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Sevilla"), getNodeByName("L4-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C4-Sevilla"), getNodeByName("L5-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Sevilla"), getNodeByName("C3-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Sevilla"), getNodeByName("C4-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L4-Sevilla"), getNodeByName("L5-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Sevilla"), getNodeByName("C3-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Sevilla"), getNodeByName("C4-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L5-Sevilla"), getNodeByName("L4-Sevilla"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-Timanfaya"), getNodeByName("C2-Timanfaya"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-Timanfaya"), getNodeByName("C1-Timanfaya"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-UPACE"), getNodeByName("C2-UPACE"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C1-UPACE"), getNodeByName("E3-UPACE"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-UPACE"), getNodeByName("C1-UPACE"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("C2-UPACE"), getNodeByName("E3-UPACE"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E3-UPACE"), getNodeByName("C1-UPACE"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("E3-UPACE"), getNodeByName("C2-UPACE"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L7-Villamarta"), getNodeByName("L8-Villamarta"), {time: 3, distance:0, type: "Change"})
graph.addEdge(getNodeByName("L8-Villamarta"), getNodeByName("L7-Villamarta"), {time: 3, distance:0, type: "Change"})

var linesinstop = {'Afanas': ['E6'],
	'Alameda Cristina': ['C3', 'C4', 'L4', 'L5', 'LT'],
	'Alameda Vieja': ['LT'],
	'Albariza': ['E5'],
	'Almunia': ['E6', 'L7'],
	'Arcos': ['L7'],
	'Area Sur': ['E4'],
	'Arenal': ['LT'],
	'Av. Andalucia': ['E5', 'L5'],
	'Av. de Italia': ['E3'],
	'Av. del Tamarix': ['E5'],
	'Av. Europa': ['E7', 'L6'],
	'Av. La Granja': ['E6', 'L6'],
	'Av. Nazaret': ['E8'],
	'Av. Taginaste': ['E7'],
	'Azorin': ['E2'],
	'Biarritz': ['E7', 'L7'],
	'Blas Infante': ['L2'],
	'Caparros': ['E2'],
	'Catavinos': ['C3', 'C4', 'C5'],
	'Caulina': ['E6', 'L7'],
	'Cementerio': ['L8'],
	'Chapin': ['L7'],
	'Circunvalacion': ['C1', 'C2', 'C5'],
	'Ciudad de los Ninos': ['E7', 'L7'],
	'Club Nazaret': ['E8'],
	'Consejo de Europa': ['E2', 'L2'],
	'Corte Ingles': ['C1', 'C2', 'E6', 'L5'],
	'Ctra. Guadalcacin': ['E6', 'L6'],
	'Cuatro Caminos': ['C3', 'C4', 'L2', 'LT'],
	'Diego de Cadiz': ['E2', 'L1'],
	'Donantes de Sangre': ['E5', 'L4'],
	'Duque de Abrantes': ['L4'],
	'El Almendral': ['C5', 'L4'],
	'El Altillo': ['E5'],
	'El Motorista': ['C1', 'C2', 'L7'],
	'El Portal': ['C1', 'C2', 'E2', 'L1', 'L2'],
	'El Retiro': ['E8', 'L8'],
	'Escuela de Arte Ecuestre': ['L4'],
	'Federico Garcia Lorca': ['C5', 'E5'],
	'Feria': ['C5'],
	'Finlandia': ['E3'],
	'Gallo Azul': ['LT'],
	'Hontoria': ['C5', 'L5', 'L6'],
	'Hospital': ['C1', 'C2', 'L3'],
	'Hospital FREMAP': ['C1', 'C2', 'E2'],
	'IFECA': ['C5', 'L6'],
	'La Canaleja': ['E8'],
	'La Consolacion': ['L8'],
	'La Granja': ['C1', 'C2', 'L6'],
	'La igualdad': ['E2'],
	'La Juventud': ['L2'],
	'La Marquesa': ['E6'],
	'La Pepa': ['C1', 'C2', 'E6'],
	'La Pita': ['E7', 'L8'],
	'La Plata': ['E5', 'L3'],
	'La Union': ['E5'],
	'Las Buganvillas': ['C1', 'C2', 'L4'],
	'Las Delicias': ['E8', 'L8'],
	'Lola Flores': ['E7'],
	'Luis Vives': ['C3', 'C4'],
	'Luz Shopping (i)': ['E4'],
	'Luz Shopping (ii)': ['E4'],
	'Madre de Dios': ['C3', 'C4', 'E1'],
	'Manuel F. Cruz': ['E6'],
	'Medina Sidonia': ['C5'],
	'Minotauro': ['C3', 'C4', 'C5', 'L7', 'L8'],
	'Moreno Mendoza': ['E2'],
	'Olivar de Rivero': ['E7'],
	'Palacio Municipal de Deportes': ['E7'],
	'Parque Atlantico': ['E8'],
	'Parque Vallesequillo': ['C1', 'C2', 'C5', 'E1'],
	'Picaduenas': ['C1', 'C2'],
	'Plaza de las Marinas': ['E5'],
	'Plaza del Caballo': ['L5'],
	'Plaza del Carbon': ['C3', 'C4'],
	'Plaza Macedonia': ['E8'],
	'Porvera': ['C3', 'C4'],
	'Pozo Albero': ['L5'],
	'Puerta de Rota': ['C3', 'C4'],
	'Puertas del Sur': ['C1', 'C2', 'LT'],
	'Rocio': ['E4'],
	'Ronda de San Telmo': ['E2', 'L1'],
	'Rotonda 4': ['C1', 'C2', 'E8'],
	'Rotonda 6': ['C1', 'C2', 'E6', 'E7', 'L8'],
	'San Jose Obrero': ['E6'],
	'San Juan de Dios': ['C1', 'C2', 'E4'],
	'San Telmo': ['C3', 'C4', 'L1'],
	'Santiago': ['C3', 'C4', 'E4', 'L3'],
	'Setefilla': ['E6'],
	'Sevilla': ['C3', 'C4', 'L4', 'L5'],
	'Tartessos': ['E8'],
	'Timanfaya': ['C1', 'C2'],
	'Universidad': ['L7'],
	'UPACE': ['C1', 'C2', 'E3'],
	'Vallesequillo': ['E1'],
	'Villamarta': ['L7', 'L8'],
	'Zoo': ['E4']}

// Aux functions
var getCoordinatesByName = name => coordinates[stopsnames.indexOf(name)]

var createElement= (n, v) => {
        n = document.createElementNS("http://www.w3.org/2000/svg", n);
        for (var p in v)
                n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) { return "-" + m.toLowerCase(); }), v[p]);
        return n
}

var overlaps = (a, b) =>  {
        const rect1 = a.getBoundingClientRect();
        const rect2 = b.getBoundingClientRect();
        const isInHoriztonalBounds =
          rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
        const isInVerticalBounds =
          rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
        const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
        return isOverlapping;
}

var overlaps_array = (element, array) => array.some(e => overlaps(e, element))

// Global variables
var state = 0;
var notSelectedRadious = 3;
var selectedRadious = 5;
var walkingSpeed = 4 * 0.277778
var busSpeed = 15 * 16.66

var dijkstra = new jKstra.algos.Dijkstra(graph);
var stopsnames = Object.keys(stops)

// Coordinates GPS projection, mapping and scaling
var coordinates = stopsnames.map(k => stops[k]).map(e => e.split(',')).map(e => [parseFloat(e[0]),parseFloat(e[1])])
var coordinatesgps = stopsnames.map(k => stops[k]).map(e => e.split(',')).map(e => [parseFloat(e[0]),parseFloat(e[1])])
var coordinates = coordinatesgps.map(e => projector.project(e[0],e[1],0)).map(e => [e[0],e[1]])

var minlat = Math.min(...coordinates.map(e => e[0]))
var minlon = Math.min(...coordinates.map(e => e[1]))
var referenceCoordinate = [minlat, minlon]
coordinates = coordinates.map(e => [(e[0]-minlat),e[1]-minlon])
var maxlat = Math.max(...coordinates.map(e => e[0]))
var maxlon = Math.max(...coordinates.map(e => e[1]))
var scale = (maxlat > maxlon) ? maxlat : maxlon
var coordinates = coordinates.map(e => [(0.05+e[0]/maxlat),0.05+e[1]/maxlon])

window.onload = _ => {
        var svg = document.getElementById("map");
        
     

        // Adding hovers to lines
        document.querySelectorAll(".linegroup").forEach(l => {
                l.addEventListener('mouseover', e => {
                        if (state != 2) {
							//console.log("Linea " + e.target.getAttribute("line").toUpperCase());
                            document.getElementById("info").innerHTML = "Linea " + e.target.getAttribute("line").toUpperCase()
                            document.getElementById("info").classList.add("line"+e.target.getAttribute("line"))
                            document.getElementById(e.target.getAttribute("line")).classList.add("activeRoute")
                        }
                }) 

                l.addEventListener('mouseout', e => {
                        if (state != 2) {
                                document.getElementById("info").innerHTML = ""
                                document.getElementById("info").classList.remove("line"+e.target.getAttribute("line"))

                                document.getElementById(e.target.getAttribute("line")).classList.remove("activeRoute")
                        }
                })
        })

        var routeFrom, routeTo;
        document.querySelectorAll('circle, rect').forEach(c => {
                c.addEventListener('mouseover', e => {
                        if (state != 2) {
                                //document.getElementById("t"+e.target.getAttribute("id")).style.display = "block";
                        }
                })

                c.addEventListener('mouseout', e => {
                        if (state != 2) {
                                //document.getElementById("t"+e.target.getAttribute("id")).style.display = "none";
                        }
                })

                c.addEventListener('click', e => {
                        if (state === 0) {
                                // Set from point
                                state = 1;
                                //e.target.setAttribute("r",selectedRadious)
								e.target.classList.add("paradaDesde")

                                routeFrom = e.target.getAttribute("id");
                                console.log("FROM: " + routeFrom)
                        } else if(state === 1) {
                                // Set to point
                                state = 2;
                                //e.target.setAttribute("r",selectedRadious)
								e.target.classList.add("paradaHasta")

                                routeTo = e.target.getAttribute("id");
                                console.log("TO: " + routeTo)

                                // Calculate paths
								
                                var startLines = linesinstop[routeFrom];
                                var endLines = linesinstop[routeTo];

                                var minTime = 99999999;
                                var minDistance = 0;
                                var finalPath = null;
                                var stopTime = 0.5;

                                for (const startL of startLines) {
                                        for (const endL of endLines) {
                                                console.log("TESTING: " + startL + '-' + routeFrom + ' to ' + endL + '-' + routeTo)

                                                var path = dijkstra.shortestPath(
                                                        getNodeByName(startL + '-' + routeFrom),
                                                        getNodeByName(endL + '-' + routeTo), {
                                                        edgeCost: (e, costDone) => e.data.time + stopTime
                                                });

                                                var totalTime = path.map(e => e.data.time + stopTime).reduce((a, b) => a + b, 0) - stopTime
                                                var totalDistance = path.map(e => e.data.distance).reduce((a, b) => a + b, 0);
                                                
                                                if(totalTime < minTime){
                                                        minTime = totalTime;
                                                        minDistance = totalDistance;
                                                        finalPath = path;
                                                }
                                        }
                                }

                                // Consoles
                                console.log(finalPath.map((e) => { return e.data.type + " ("
                                        + (e.data.time).toFixed(2) + " min - "
                                        + (e.data.distance/1000).toFixed(2) + " km): "
                                        + e.from.data.name + " -> " + e.to.data.name 
                                        + "\n"}).join(""));                                
                                console.log("TOTAL: " +  (minTime).toFixed(2) +  " min - "+  (minDistance/1000).toFixed(2) +  " km")


                                // Set route on SVG
                                finalPath.forEach(e => {
                                        if (e.data.type != "Change" ){
                                                var element = document.getElementById(e.from.data.name.split('-')[0] + "-" + e.from.data.name.split('-')[1] + "-" + e.to.data.name.split('-')[1])
                                                if (element) {
                                                        element.classList.add("activeRoute")        
                                                }else{
                                                        element = document.getElementById(e.from.data.name.split('-')[0] + "-" + e.to.data.name.split('-')[1] + "-" + e.from.data.name.split('-')[1])
                                                }
                                                element.classList.add("activeRoute")        
                                        }
                                })

                                //document.getElementById("t"+routeFrom).style.display = "block";
                                //document.getElementById("t"+routeTo).style.display = "block";

                                // Set info box
                                // SPAGUETTI CODE FROM HERE 
                                var linename = "";
                                finalPath = finalPath.map(e => [e.data.type,e.from.data.name,e.to.data.name])

                                var textPath = {};
                                finalPath.forEach(e => {
                                        if (e[0] != "Change") {
                                                if (textPath[e[0]] === undefined) {
                                                        textPath[e[0]] = []  
                                                }
                                                textPath[e[0]].push(e[1].split('-')[1],e[2].split('-')[1])
                                        }
                                })

                                finalPath.forEach((e,i) => {
                                        var p = document.createElement("p")
                                        p.classList.add("routeInfo")
                                        
                                        if (e[0]== "Change" ) {
                                                p.innerHTML = "Cambia de linea <b class='line" + e[1].split('-')[0] + "'>" + e[1].split('-')[0] + "</b> a linea <b class='line" + e[2].split('-')[0] + "'>" + e[2].split('-')[0] + "</b>"
                                                p.classList.add("walkingline")
                                        }else{
                                                if (textPath[e[0]] !== undefined) {
                                                        linename = e[0]
                                                        p.innerHTML = "Trayecto <strong>"+linename+"</strong> de <b>" + textPath[e[0]][0] + "</b> a <b>" + textPath[e[0]][textPath[e[0]].length-1] + "</b>"
                                                        p.classList.add("line"+linename) 
                                                        delete textPath[e[0]]
                                                }       
                                        }

                                        document.getElementById("cornerleft").appendChild(p)
                                })

                                var p = document.createElement("p")
                                p.classList.add("routeInfo")
                                p.innerHTML = "<b>Tiempo aproximado: " +  (minTime).toFixed(0) +  " min </b> "
                                document.getElementById("cornerleft").appendChild(p)
                                // SPAGUETTI CODE TO HERE 
								
								document.querySelectorAll(".line").forEach(e => {
									if (!e.classList.contains('activeRoute')){
										e.classList.add('nonActiveRoute')
									}									
								})
								
								//scrollToTop(1000);

                        }
                });
        });
		
        document.querySelectorAll('#origen').forEach(c => {

                c.addEventListener('change', e => {
					
					//console.log(state);
						
					if (!routeTo && e.target.value) {
						state = 1;
						routeFrom = e.target.value
					} 
					
					if (routeTo && e.target.value) {
						state = 2;
						routeFrom = e.target.value
					} 
					
					if (!routeFrom && !e.target.value) {
						state = 0;
						routeFrom = "";
					} 
					
					
					if (state === 2){
						calcular(routeFrom,routeTo)
					}
					
					//console.log(state);
						
                });
        });

        document.querySelectorAll('#destino').forEach(c => {

                c.addEventListener('change', e => {
					
					//console.log(state);

					if (!routeFrom && e.target.value) {
						state = 1;
						routeTo = e.target.value
					} 
					
					if (routeFrom && e.target.value) {
						state = 2;
						routeTo = e.target.value
					} 
					
					if (!routeFrom && !e.target.value) {
						state = 0;
						routeTo = "";
					} 
											
					if (state === 2){
						calcular(routeFrom,routeTo)
					}
					
					//console.log(state);
							
                });
        });



        // Removing all routes afet calculation and click
        var removeroute = _ => {
                state = 0;
                // Remove route info
                document.querySelectorAll(".routeInfo").forEach(e => {
                        e.parentNode.removeChild(e)
                })

                document.querySelectorAll(".stopText").forEach(e => {
                        e.style.display = "none";
                })

                // Remove walking lines
                document.querySelectorAll(".walkingline").forEach(e => {
                        e.parentNode.removeChild(e)
                })

                // Remove activeRoute class
                document.querySelectorAll(".activeRoute").forEach(e => {
                        e.classList.remove("activeRoute")
                })

                document.querySelectorAll("circle, rect").forEach(e => {
                        //e.setAttribute("r",notSelectedRadious)
						e.classList.remove("paradaDesde");
						e.classList.remove("paradaHasta");
						e.classList.remove('nonActiveRoute');
                })
				
                document.querySelectorAll(".nonActiveRoute").forEach(e => {                        
						e.classList.remove('nonActiveRoute');
                })
				
				info = document.getElementById("info");
				info.innerHTML = "<span class='routeInfo'><strong>Información de la ruta</strong><br>Selecciona paradas de origen y destino para calcular el trayacto más óptimo</span>";
        }

        document.addEventListener('click', e => {
                if (state == 2 && e.target.getAttribute("id") === "map") {
                        removeroute()
                }
        })
		
		


}



function calcular(routeFrom,routeTo) {
	
	console.log("DESDE: " + routeFrom);
	console.log("HASTA: " + routeTo);
	
	document.getElementById("resultados").innerHTML = "";

	// Calculate paths
	
	var startLines = linesinstop[routeFrom];
	var endLines = linesinstop[routeTo];

	var minTime = 99999999;
	var minDistance = 0;
	var finalPath = null;
	var stopTime = 0.5;

	for (const startL of startLines) {
			for (const endL of endLines) {
					console.log("TESTING: " + startL + '-' + routeFrom + ' to ' + endL + '-' + routeTo)

					var path = dijkstra.shortestPath(
							getNodeByName(startL + '-' + routeFrom),
							getNodeByName(endL + '-' + routeTo), {
							edgeCost: (e, costDone) => e.data.time + stopTime
					});

					var totalTime = path.map(e => e.data.time + stopTime).reduce((a, b) => a + b, 0) - stopTime
					var totalDistance = path.map(e => e.data.distance).reduce((a, b) => a + b, 0);
					
					if(totalTime < minTime){
							minTime = totalTime;
							minDistance = totalDistance;
							finalPath = path;
					}
			}
	}

	// Consoles
	console.log(finalPath.map((e) => { return e.data.type + " ("
			+ (e.data.time).toFixed(2) + " min - "
			+ (e.data.distance/1000).toFixed(2) + " km): "
			+ e.from.data.name + " -> " + e.to.data.name 
			+ "\n"}).join(""));                                
	console.log("TOTAL: " +  (minTime).toFixed(2) +  " min - "+  (minDistance/1000).toFixed(2) +  " km")



	//document.getElementById("t"+routeFrom).style.display = "block";
	//document.getElementById("t"+routeTo).style.display = "block";

	// Set info box
	// SPAGUETTI CODE FROM HERE 
	var linename = "";
	finalPath = finalPath.map(e => [e.data.type,e.from.data.name,e.to.data.name])

	var textPath = {};
	finalPath.forEach(e => {
			if (e[0] != "Change") {
					if (textPath[e[0]] === undefined) {
							textPath[e[0]] = []  
					}
					textPath[e[0]].push(e[1].split('-')[1],e[2].split('-')[1])
			}
	})

	finalPath.forEach((e,i) => {
			var p = document.createElement("p")
			p.classList.add("routeInfo")
			
			if (e[0]== "Change" ) {
					p.innerHTML = "Cambia de linea <b class='line" + e[1].split('-')[0] + "'>" + e[1].split('-')[0] + "</b> a linea <b class='line" + e[2].split('-')[0] + "'>" + e[2].split('-')[0] + "</b>"
					p.classList.add("walkingline")
			}else{
					if (textPath[e[0]] !== undefined) {
							linename = e[0]
							p.innerHTML = "Trayecto <strong>"+linename+"</strong> de <b>" + textPath[e[0]][0] + "</b> a <b>" + textPath[e[0]][textPath[e[0]].length-1] + "</b>"
							p.classList.add("line"+linename) 
							delete textPath[e[0]]
					}       
			}

			document.getElementById("resultados").appendChild(p)
	})

	var p = document.createElement("p")
	p.classList.add("routeInfo")
	p.innerHTML = "<b>Tiempo aproximado: " +  (minTime).toFixed(0) +  " min </b> "
	document.getElementById("resultados").appendChild(p)
	// SPAGUETTI CODE TO HERE 
	
	document.querySelectorAll(".line").forEach(e => {
		if (!e.classList.contains('activeRoute')){
			e.classList.add('nonActiveRoute')
		}									
	})
}


function scrollToTop(scrollDuration) {
	var scrollStep = -window.scrollY / (scrollDuration / 15),
	scrollInterval = setInterval(function(){
	if ( window.scrollY != 0 ) {
		window.scrollBy( 0, scrollStep );
	}
	else clearInterval(scrollInterval); 
},15);

}

},{"ecef-projector":2,"jkstra":11}],2:[function(require,module,exports){
/*
 * (C) 2015 Seth Lakowske

 * A projector that converts GPS->ECEF and ECEF->GPS
 *
 * Formulas from this paper:
 * Datum Transformations of GPS Positions
 * Application Note
 * 5th July 1999
 */

var wgs84 = require('wgs84');

/*
 * Converts an angle in radians to degrees.
 */
function degrees(angle) {
    return angle * (180 / Math.PI);
}

/*
 * Converts an angle in degrees to radians.
 */
function radians(angle) {
    return angle * (Math.PI / 180);
}

/*
 * Some constants we'll want to have on hand
 */
var a    = wgs84.RADIUS;
var f    = wgs84.FLATTENING;
var b    = wgs84.POLAR_RADIUS;
var asqr = a*a;
var bsqr = b*b;

var e = Math.sqrt((asqr-bsqr)/asqr);
var eprime = Math.sqrt((asqr-bsqr)/bsqr);


/*
 * Convert GPS coordinates (degrees) to Cartesian coordinates (meters)
 */
function project(latitude, longitude, altitude) {
    return LLAToECEF(radians(latitude), radians(longitude), altitude);
}

/*
 * Convert Cartesian coordinates (meters) to GPS coordinates (degrees)
 */
function unproject(x, y, z) {
    var gps = ECEFToLLA(x, y, z);

    gps[0] = degrees(gps[0]);
    gps[1] = degrees(gps[1]);

    return gps;
}

function LLAToECEF(latitude, longitude, altitude) {
    //Auxiliary values first
    var N = getN(latitude);
    var ratio = (bsqr / asqr);

    //Now calculate the Cartesian coordinates
    var X = (N + altitude) * Math.cos(latitude) * Math.cos(longitude);
    var Y = (N + altitude) * Math.cos(latitude) * Math.sin(longitude);

    //Sine of latitude looks right here
    var Z = (ratio * N + altitude) * Math.sin(latitude);

    return [X, Y, Z];
}

function ECEFToLLA(X, Y, Z) {
    //Auxiliary values first
    var p = Math.sqrt(X*X + Y*Y);
    var theta = Math.atan((Z*a)/(p*b));

    var sintheta = Math.sin(theta);
    var costheta = Math.cos(theta);

    var num = Z + eprime * eprime * b * sintheta * sintheta * sintheta;
    var denom = p - e * e * a * costheta * costheta * costheta;

    //Now calculate LLA
    var latitude  = Math.atan(num/denom);
    var longitude = Math.atan(Y/X);
    var N = getN(latitude);
    var altitude  = (p / Math.cos(latitude)) - N;

    if (X < 0 && Y < 0) {
        longitude = longitude - Math.PI;
    }

    if (X < 0 && Y > 0) {
        longitude = longitude + Math.PI;
    }

    return [latitude, longitude, altitude];
}

function getN(latitude) {
    var sinlatitude = Math.sin(latitude);
    var denom = Math.sqrt(1-e*e*sinlatitude*sinlatitude);
    var N = a / denom;
    return N;
}

module.exports.project   = project;
module.exports.unproject = unproject;

},{"wgs84":13}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../core/constants.js');

function BFS(graph, opts) {
    var options = _extends({ flagKey: '_bfs' }, opts);
    var flagKey = options.flagKey;

    function clearFlags() {
        graph.forEachVertex(function (v) {
            delete v[flagKey];
        });
    }

    function mark(v) {
        v[flagKey] = true;
    }

    function isMarked(v) {
        return v[flagKey] === true;
    }

    var defaultTraversalOptions = {
        direction: _constants.OUT,
        onVisit: function onVisit(u) {},
        onTestEdge: function onTestEdge(e) {},
        edgeFilter: null // take all edges
    };

    return {
        /**
        Traverse the graph using the breadth first algorithm,
        starting from source, with the specified options
        */

        traverse: function traverse(source, opts) {
            var options = _extends({}, defaultTraversalOptions, opts);

            clearFlags();

            var queue = [];
            queue.push(source);
            mark(source, null);
            var u = void 0,
                v = void 0,
                edges = void 0;

            while (queue.length > 0) {
                u = queue.shift();
                options.onVisit(u);
                edges = graph.incidentEdges(u, options.direction, options.edgeFilter);
                edges.forEach(function (e) {
                    options.onTestEdge(e);
                    v = options.direction ? e.to : e.from;
                    if (!isMarked(v)) {
                        mark(v);
                        queue.push(v);
                    }
                });
            }
        }
    };
}

exports.default = BFS;
module.exports = exports['default'];

},{"../core/constants.js":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DijkstraIterator = require('../algos/DijkstraIterator.js');

var _DijkstraIterator2 = _interopRequireDefault(_DijkstraIterator);

var _nodeFlagger = require('./nodeFlagger.js');

var _nodeFlagger2 = _interopRequireDefault(_nodeFlagger);

var _constants = require('../core/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BidirectionalDijkstra = function () {
    function BidirectionalDijkstra(graph, opts) {
        _classCallCheck(this, BidirectionalDijkstra);

        this.graph = graph;
        this.options = _extends({}, opts);
        this.outKey = '_dijkstra_out';
        this.inKey = '_dijkstra_in';
    }

    _createClass(BidirectionalDijkstra, [{
        key: 'rebuildPath',
        value: function rebuildPath(meetingNode) {
            var edges = [];
            var edge = void 0;
            var currentNode = meetingNode;
            // going upward in the tree until the first vertex (with no incoming edge)
            while ((edge = this.outFlagger.getFlags(currentNode).inc) !== null) {
                edges.push(edge);
                currentNode = edge.from;
            }
            edges.reverse();
            currentNode = meetingNode;
            // going upward in the tree until the first vertex (with no incoming edge)
            while ((edge = this.inFlagger.getFlags(currentNode).inc) !== null) {
                edges.push(edge);
                currentNode = edge.to;
            }
            return edges;
        }
    }, {
        key: '_hasBeenReachBothWays',
        value: function _hasBeenReachBothWays(node) {
            var outState = this.outFlagger.getFlags(node);
            var inState = this.inFlagger.getFlags(node);

            return (outState.state === _constants.REACHED || outState.state === _constants.SETTLED) && (inState.state === _constants.REACHED || inState.state === _constants.SETTLED);
        }
    }, {
        key: 'shortestPath',
        value: function shortestPath(source, target, options) {
            var outIteraror = new _DijkstraIterator2.default(this.graph, source, _extends({}, options, options.OUT, { direction: _constants.OUT, flagKey: this.outKey }));
            var inIterator = new _DijkstraIterator2.default(this.graph, target, _extends({}, options, options.IN, { direction: _constants.IN, flagKey: this.inKey }));
            this.outFlagger = new _nodeFlagger2.default(this.graph, this.outKey);
            this.inFlagger = new _nodeFlagger2.default(this.graph, this.inKey);

            var iterator = outIteraror;
            var meetingNode = void 0;
            var next = void 0;

            // simply loop over the iterator until it ends
            while (!(next = iterator.next()).done) {
                if (this._hasBeenReachBothWays(next.value)) {
                    meetingNode = next.value;
                    break;
                }
                // alternate between the two iterators
                iterator = iterator === outIteraror ? inIterator : outIteraror;
            }

            if (meetingNode) {
                return this.rebuildPath(meetingNode);
            }
            return null;
        }
    }]);

    return BidirectionalDijkstra;
}();

;

exports.default = BidirectionalDijkstra;
module.exports = exports['default'];

},{"../algos/DijkstraIterator.js":6,"../core/constants.js":9,"./nodeFlagger.js":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DijkstraIterator = require('../algos/DijkstraIterator.js');

var _DijkstraIterator2 = _interopRequireDefault(_DijkstraIterator);

var _nodeFlagger = require('./nodeFlagger.js');

var _nodeFlagger2 = _interopRequireDefault(_nodeFlagger);

var _constants = require('../core/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dijkstra = function () {
    function Dijkstra(graph, opts) {
        _classCallCheck(this, Dijkstra);

        this.graph = graph;
        this.options = _extends({ flagKey: '_dijkstra' }, opts);
        this.nodeFlagger = new _nodeFlagger2.default(this.graph, this.options.flagKey);
    }

    _createClass(Dijkstra, [{
        key: 'rebuildPath',
        value: function rebuildPath(end) {
            var edges = [];
            var edge = void 0;
            // going upward in the tree until the first vertex (with no incoming edge)
            while ((edge = this.nodeFlagger.getFlags(end).inc) !== null) {
                edges.push(edge);
                end = edge.from;
            }
            return edges.reverse();
        }
    }, {
        key: 'shortestPath',


        /**
        The most common use of Dijkstra traversal
        */
        value: function shortestPath(source, target, opts) {
            var _this = this;

            var options = opts || {};
            options.isFinished = function () {
                return _this.nodeFlagger.getFlags(target).state === _constants.SETTLED;
            };

            var found = this.traverse(source, options);
            if (found) {
                return this.rebuildPath(target);
            }
            return null;
        }

        /**
        Traverse the graph using Dijkstra's algorithm,
        starting from source, with the specified options
        */

    }, {
        key: 'traverse',
        value: function traverse(source, opts) {
            var options = _extends({}, Dijkstra.defaultTraversalOptions, opts);
            var dijkstraIterator = new _DijkstraIterator2.default(this.graph, source, opts);

            // simply loop over the iterator until it ends
            while (!dijkstraIterator.next().done && !options.isFinished()) {}

            // if false, means the whole graph was traversed
            return options.isFinished();
        }
    }]);

    return Dijkstra;
}();

Dijkstra.defaultTraversalOptions = {
    isFinished: function isFinished() {
        return false;
    }
};
;

exports.default = Dijkstra;
module.exports = exports['default'];

},{"../algos/DijkstraIterator.js":6,"../core/constants.js":9,"./nodeFlagger.js":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _updatablePriorityQueue = require('updatable-priority-queue');

var _updatablePriorityQueue2 = _interopRequireDefault(_updatablePriorityQueue);

var _nodeFlagger = require('./nodeFlagger.js');

var _nodeFlagger2 = _interopRequireDefault(_nodeFlagger);

var _constants = require('../core/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DijkstraIterator = function () {
    // take all edges

    function DijkstraIterator(graph, source, opts) {
        _classCallCheck(this, DijkstraIterator);

        this.graph = graph;
        this.source = source;
        this.options = _extends({}, DijkstraIterator.defaultOptions, opts);
        this.flags = new _nodeFlagger2.default(this.graph, this.options.flagKey);

        this.pQ = new _updatablePriorityQueue2.default();
        this._initTraversal();
    }

    _createClass(DijkstraIterator, [{
        key: '_reach',
        value: function _reach(v, incEdge, fCost, gCost, action) {
            // update state to "reached", and register cost and incomingEdge
            this.flags.setFlags(v, { state: _constants.REACHED, fCost: fCost, gCost: gCost, inc: incEdge });
            if (action) {
                action(v);
            }
        }
    }, {
        key: '_settle',
        value: function _settle(v, action) {
            this.flags.setFlags(v, { state: _constants.SETTLED });
            if (action) {
                action(v);
            }
        }
    }, {
        key: '_initTraversal',
        value: function _initTraversal() {
            // reset node tagging
            this.flags.clearFlags(this.graph);
            this.pQ.insert(this.source, this.options.heuristic(this.source));
            this._reach(this.source, null, this.options.heuristic(this.source), 0, this.options.onReach);
        }
    }, {
        key: 'next',
        value: function next() {
            // if no more node available in the queue,
            // return the iterator end signal
            if (this.pQ.count === 0) {
                return { done: true };
            }

            var _options = this.options;
            var direction = _options.direction;
            var onReach = _options.onReach;
            var onSettle = _options.onSettle;
            var edgeFilter = _options.edgeFilter;
            var edgeCost = _options.edgeCost;
            var heuristic = _options.heuristic;
            var shouldUpdateKey = _options.shouldUpdateKey;


            var u = this.pQ.pop().item;
            var v = void 0;
            var vFlags = void 0;
            var uGCost = this.flags.getFlags(u).gCost;
            var vFCost = void 0,
                vGCost = void 0;

            this._settle(u, onSettle);
            var edges = this.graph.incidentEdges(u, direction, edgeFilter);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = edges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var e = _step.value;

                    v = direction === _constants.OUT ? e.to : e.from;
                    vFlags = this.flags.getFlags(v);

                    if (vFlags.state !== _constants.SETTLED) {
                        vGCost = uGCost + edgeCost(e, uGCost);
                        vFCost = vGCost + heuristic(v);
                        if (vFlags.state !== _constants.REACHED) {
                            this.pQ.insert(v, vFCost);
                            this._reach(v, e, vFCost, vGCost, onReach);
                        } else {
                            if (shouldUpdateKey(vFlags.fCost, vFCost, vFlags.inc, e)) {
                                this.pQ.updateKey(v, vFCost);
                                this._reach(v, e, vFCost, vGCost, onReach);
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return { value: u };
        }
    }]);

    return DijkstraIterator;
}();

DijkstraIterator.defaultOptions = {
    flagKey: '_dijkstra',
    direction: _constants.OUT,
    shouldUpdateKey: function shouldUpdateKey(prevCost, newCost) {
        return newCost < prevCost;
    },
    edgeCost: function edgeCost(e, costDone) {
        return 1;
    },
    heuristic: function heuristic(v) {
        return 0;
    },
    onReach: null, // nothing special to do when reaching a node
    onSettle: null, // nothing special to do when setting a node
    edgeFilter: null };
;

exports.default = DijkstraIterator;
module.exports = exports['default'];

},{"../core/constants.js":9,"./nodeFlagger.js":7,"updatable-priority-queue":12}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(graph, flagKey) {
        _classCallCheck(this, _class);

        this.graph = graph;
        this.flagKey = flagKey;
    }

    _createClass(_class, [{
        key: "clearFlags",
        value: function clearFlags(graph) {
            var _this = this;

            this.graph.forEachVertex(function (v) {
                delete v[_this.flagKey];
            });
        }
    }, {
        key: "getFlags",
        value: function getFlags(v) {
            return v[this.flagKey] || {};
        }
    }, {
        key: "setFlags",
        value: function setFlags(v, flags) {
            if (!v.hasOwnProperty(this.flagKey)) {
                v[this.flagKey] = {};
            }
            for (var key in flags) {
                v[this.flagKey][key] = flags[key];
            }
        }
    }]);

    return _class;
}();

exports.default = _class;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants.js');

var _utils = require('./utils.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = function () {
    function Graph() {
        _classCallCheck(this, Graph);

        this.vertices = [];
        this.edges = [];
    }

    _createClass(Graph, [{
        key: 'addVertex',
        value: function addVertex(data) {
            var vertex = {
                _in: [],
                _out: [],
                data: data
            };
            this.vertices.push(vertex);
            return vertex;
        }
    }, {
        key: 'addEdge',
        value: function addEdge(from, to, data) {
            var edge = {
                from: from,
                to: to,
                data: data || {}
            };
            from._out.push(edge);
            to._in.push(edge);
            this.edges.push(edge);
            return edge;
        }

        /**
        Shortcut to add an edge and its reverse,
        sharing the same data.
        */

    }, {
        key: 'addEdgePair',
        value: function addEdgePair(a, b, data) {
            return [this.addEdge(a, b, data), this.addEdge(b, a, data)];
        }
    }, {
        key: 'removeEdge',
        value: function removeEdge(edge) {
            var index = this.edges.indexOf(edge);
            if (index !== -1) {
                // remove from extremity this.vertices first
                edge.from._out.splice(edge.from._out.indexOf(edge), 1);
                edge.to._in.splice(edge.to._in.indexOf(edge), 1);
                this.edges.splice(index, 1);
            }
        }
    }, {
        key: 'removeVertex',
        value: function removeVertex(vertex) {
            var index = this.vertices.indexOf(vertex);
            if (index !== -1) {
                // remove all incident this.edges first
                var edgesToRemove = vertex._in.concat(vertex._out);
                for (var i = 0; i < edgesToRemove.length; i++) {
                    this.removeEdge(edgesToRemove[i]);
                }
                this.vertices.splice(index, 1);
            }
        }
    }, {
        key: 'outEdges',
        value: function outEdges(vertex, filter) {
            return this.incidentEdges(vertex, _constants.OUT, filter);
        }
    }, {
        key: 'inEdges',
        value: function inEdges(vertex, filter) {
            return this.incidentEdges(vertex, _constants.IN, filter);
        }

        /**
        Returns all this.edges incident to a vertex, in one direction (outgoing or incoming),
        optionnaly filtered by a given function.
        */

    }, {
        key: 'incidentEdges',
        value: function incidentEdges(vertex, direction, filter) {
            if (!filter) {
                return direction ? vertex._out : vertex._in;
            }
            var edges = direction ? vertex._out : vertex._in;
            return edges.filter(filter);
        }
    }, {
        key: 'vertex',
        value: function vertex(props) {
            var vertices = this.vertices;
            for (var i = 0, l = vertices.length; i < l; i++) {
                if ((0, _utils.propsMatch)(vertices[i].data, props)) {
                    return vertices[i];
                }
            }
            return null;
        }
    }, {
        key: 'edge',
        value: function edge(props) {
            var edges = this.edges;
            for (var i = 0, l = edges.length; i < l; i++) {
                if ((0, _utils.propsMatch)(edges[i].data, props)) {
                    return edges[i];
                }
            }
            return null;
        }

        /**
        Perform an action on each vertex of the graph
        */

    }, {
        key: 'forEachVertex',
        value: function forEachVertex(action) {
            this.vertices.forEach(function (v) {
                return action(v);
            });
        }

        /**
        Perform an action on each edge of the graph
        */

    }, {
        key: 'forEachEdge',
        value: function forEachEdge(action) {
            this.edges.forEach(function (e) {
                return action(e);
            });
        }
    }, {
        key: 'vertexCount',
        get: function get() {
            return this.vertices.length;
        }
    }, {
        key: 'edgeCount',
        get: function get() {
            return this.edges.length;
        }
    }]);

    return Graph;
}();

;

exports.default = Graph;
module.exports = exports['default'];

},{"./constants.js":9,"./utils.js":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var OUT = exports.OUT = true;
var IN = exports.IN = false;
var REACHED = exports.REACHED = 1;
var SETTLED = exports.SETTLED = 2;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.propsMatch = propsMatch;

function isScalar(o) {
    return (/boolean|number|string/.test(typeof o === "undefined" ? "undefined" : _typeof(o))
    );
};

function propsMatch(set, subSet) {
    if (subSet === null) {
        return set === null;
    }

    if (isScalar(set)) {
        return isScalar(subSet) && set === subSet;
    }

    for (var p in subSet) {
        if (set.hasOwnProperty(p)) {
            if (!propsMatch(set[p], subSet[p])) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BFS = require('./algos/BFS.js');

var _BFS2 = _interopRequireDefault(_BFS);

var _DijkstraIterator = require('./algos/DijkstraIterator.js');

var _DijkstraIterator2 = _interopRequireDefault(_DijkstraIterator);

var _Dijkstra = require('./algos/Dijkstra.js');

var _Dijkstra2 = _interopRequireDefault(_Dijkstra);

var _BidirectionalDijkstra = require('./algos/BidirectionalDijkstra.js');

var _BidirectionalDijkstra2 = _interopRequireDefault(_BidirectionalDijkstra);

var _Graph = require('./core/Graph.js');

var _Graph2 = _interopRequireDefault(_Graph);

var _constants = require('./core/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jKstra = {
    IN: _constants.IN,
    OUT: _constants.OUT,
    Graph: _Graph2.default,
    algos: {
        BFS: _BFS2.default,
        Dijkstra: _Dijkstra2.default,
        BidirectionalDijkstra: _BidirectionalDijkstra2.default,
        DijkstraIterator: _DijkstraIterator2.default
    }
};

exports.default = jKstra;
module.exports = exports['default'];

},{"./algos/BFS.js":3,"./algos/BidirectionalDijkstra.js":4,"./algos/Dijkstra.js":5,"./algos/DijkstraIterator.js":6,"./core/Graph.js":8,"./core/constants.js":9}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PriorityQueue = function () {
    function PriorityQueue() {
        _classCallCheck(this, PriorityQueue);

        this.heap = [];
    }

    // TODO: make it an option, for max or min priority queue


    _createClass(PriorityQueue, [{
        key: "_compare",
        value: function _compare(a, b) {
            return a.key - b.key;
        }
    }, {
        key: "_bubbleUp",
        value: function _bubbleUp(idx) {
            var element = this.heap[idx];
            var parentIdx = void 0;
            var parent = void 0;
            while (idx > 0) {
                // Compute the parent element's index, and fetch it.
                parentIdx = Math.floor((idx + 1) / 2) - 1;
                parent = this.heap[parentIdx];
                // If the parent has a lesser score, things are in order and we
                // are done.
                if (this._compare(element, parent) > 0) {
                    break;
                }

                // Otherwise, swap the parent with the current element and
                // continue.
                this.heap[parentIdx] = element;
                this.heap[idx] = parent;
                idx = parentIdx;
            }
        }
    }, {
        key: "_sinkDown",
        value: function _sinkDown(idx) {
            var length = this.heap.length;
            var element = this.heap[idx];
            var swapIdx = void 0;

            while (true) {
                var rChildIdx = (idx + 1) * 2;
                var lChildIdx = rChildIdx - 1;
                swapIdx = -1;

                // if the first child exists
                if (lChildIdx < length) {
                    var lChild = this.heap[lChildIdx];
                    // and is lower than the element, they must be swapped
                    if (this._compare(lChild, element) < 0) {
                        swapIdx = lChildIdx;
                    }

                    // unless there is another lesser child, which will be the one swapped
                    if (rChildIdx < length) {
                        var rChild = this.heap[rChildIdx];
                        if ((swapIdx === -1 || this._compare(rChild, lChild) < 0) && this._compare(rChild, element) < 0) {
                            swapIdx = rChildIdx;
                        }
                    }
                }

                // if no swap occurs, the element found its right place
                if (swapIdx === -1) {
                    break;
                }

                // otherwise, swap and continue on next tree level
                this.heap[idx] = this.heap[swapIdx];
                this.heap[swapIdx] = element;
                idx = swapIdx;
            }
        }
    }, {
        key: "_findElementIndex",
        value: function _findElementIndex(item) {
            // TODO: optimize
            for (var i = 0, l = this.heap.length; i < l; i++) {
                if (this.heap[i].item === item) {
                    return i;
                }
            }
            return -1;
        }
    }, {
        key: "insert",
        value: function insert(item, key) {
            this.heap.push({ item: item, key: key });
            this._bubbleUp(this.heap.length - 1);
        }
    }, {
        key: "pop",
        value: function pop() {
            if (this.heap.length === 0) {
                return null;
            }
            var element = this.heap[0];
            var end = this.heap.pop();
            // replace the first element by the last,
            // and let it sink to its right place
            if (this.heap.length > 0) {
                this.heap[0] = end;
                this._sinkDown(0);
            }
            return element;
        }
    }, {
        key: "peek",
        value: function peek() {
            if (this.heap.length === 0) {
                return null;
            }
            return this.heap[0];
        }
    }, {
        key: "updateKey",
        value: function updateKey(item, newKey) {
            var idx = this._findElementIndex(item);
            if (idx === -1) {
                return;
            }
            var oldKey = this.heap[idx].key;
            this.heap[idx].key = newKey;
            if (newKey < oldKey) {
                this._bubbleUp(idx);
            } else {
                this._sinkDown(idx);
            }
        }
    }, {
        key: "count",
        get: function get() {
            return this.heap.length;
        }
    }]);

    return PriorityQueue;
}();

;

exports.default = PriorityQueue;
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
module.exports.RADIUS = 6378137;
module.exports.FLATTENING = 1/298.257223563;
module.exports.POLAR_RADIUS = 6356752.3142;

},{}]},{},[1]);
