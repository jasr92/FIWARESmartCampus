atributos_propiedades = ["id", "type", "location", "URLImagen"];
tipos = ["Arbol", "Biodiversidad", "Cargadores", "Zonas"];

function traductorAtributos(type, atributoBuscado) {

    var atributos;
    var atributosTraducidos
    var NombreAtributo = atributoBuscado;

    // AQUÍ SE DEBEN AÑADIR LOS ATRIBUTOS Y LO QUE SE QUIERE VER POR PANTALLA ==================================
    if (type.localeCompare(tipos[0]) == 0) { //Si vale ese valor
        //Árboles
        var atributos = ["Altura", "DiametroCopa", "DiametroTronco", "NombreCientifico", "NombreVulgar"];
        var atributosTraducidos = ["Altura (m)", "Diámetro Copa (m)", "Diámetro Tronco (m)", "Nombre Científico", "Nombre Común"];
    }
    if(type.localeCompare(tipos[1]) == 0){
        //Biodiversidad
        var atributos = ["contenido", "properties", "time"];
        var atributosTraducidos = ["Descripcion", "Propiedades", "Fecha y hora"];
    }
    if(type.localeCompare(tipos[2]) == 0){
        //Cargadores
        var atributos = ["nombre", "descripcion", "modelo", "conectores"];
        var atributosTraducidos = ["Punto", "Descripción", "Modelo", "Conectores"];
    }
    //===========================================================================================================


    var indice = atributos.indexOf(atributoBuscado);
    if (indice != -1) { //Si lo encuentra en nuestra lista
        NombreAtributo = atributosTraducidos[indice];
    }
    return NombreAtributo;
}


//Estilo Interaccion
function flyTo(location, done) {
    var duration = 1500;
    var zoom = view.getZoom();
    var parts = 2;
    var called = false;

    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    }

    view.animate({
        center: location,
        duration: duration
    }, callback);
    view.animate({
        zoom: zoom - 0.2,
        duration: duration / 2
    }, {
        zoom: zoom + 2,
        duration: duration / 2
    }, callback);
}

function styleSelectObject(feature, resolution) {
    //console.log(feature.get('features'))
    var size = feature.get('features').length;
    var tipoEntidad = feature.get('features')[0].get('name');

    var pointStyle = getCircleStyle(size, tipoEntidad);
    var coordenadas = feature.get('features')[0].getGeometry().getCoordinates();
    if (size > 1) {
        //Acerco
        //console.log(typeof coordenadas)
        //console.log(coordenadas);
        flyTo(coordenadas, function () {
        });
        selectObject.getFeatures().clear();
        return
    } else {
        var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordenadas));
        var coord = ol.proj.toLonLat(coordenadas);

        var id = feature.get('features')[0].getId();
        var datoActual = buscar_x_ID_JSON(obj, id);
        var type = datoActual.type;


        content.innerHTML = '<p>ID: ' + id + '</p>' +
            '<p>Coordenadas: ' + hdms + '</p>' +
            '<p>Coordenadas: ' + coord + '</p>';


        //console.log(datoActual);

        var atributos = Object.keys(datoActual);


        text_Info.innerHTML = "";
        for (var i = 0; i < atributos.length; i++) {
            if (!atributos_propiedades.includes(atributos[i])) { //En caso de que no sea un atributo de propiedades
                var li = document.createElement("li");
                nombreAtributo = traductorAtributos(type, atributos[i]);

                li.innerHTML = '<b>' + nombreAtributo + ': </b>' + datoActual[atributos[i]].value;
                text_Info.appendChild(li);
            } else if (atributos[i].localeCompare("URLImagen") == 0) {
                foto_Info.innerHTML = "<a><img src=" + datoActual.URLImagen.value + " alt=" + id + " style= height:100%;width:100%;image-orientation:from-image;" + " /></a>";
            }
        }
    }
    overlay.setPosition(coordenadas);
    estilo = buscadorEstilosIconSelected(type);
    return estilo;
}


function buscadorEstilosIconSelected(type) {
    var enlace;
    if (type.localeCompare(tipos[0]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Arbol/icon_tree_magenta.png';
    } else if (type.localeCompare(tipos[1]) == 0){
        enlace = 'http://osm.uma.es/Iconos/Bio/Biodiversidad_2.png';
    } else if (type.localeCompare(tipos[2]) == 0){
        enlace = 'http://osm.uma.es/Iconos/Carga/carga2.png';
    } else {
        enlace = 'http://osm.uma.es/Iconos/Default/interrogacionSelect.png';
    }
    estilo = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            scale: 0.5,
            src: enlace
        })
    });

    return estilo;
}