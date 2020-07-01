atributos_propiedades = ["id", "type", "location", "URLImagen"];
tipos = ["Arbol", "Biodiversidad", "Cargadores", "Zonas", "Parkings", "EquiposClimatizacion"];

function menuInformacion(){
    g_ent = ["Árboles", "Biodiversidad", "Cargadores eléctricos", "Zonas", "Parkings de Bicis", "Equipos de Climatización"];
    inf_ent = ["Muestra de la arboleda exsistente en el Boulevar Louis Pasteur del Campus de Teatinos.",
               "Muestra de la biodiversidad de la zona. Fotografías obtenidas en la campaña Rétame impulsada por el Vicerrectorado de Smart-Campus en el curso 2018/2019.",
               "Situación de las tomas con cargadores para vehículos eléctricos en los distintos campus de la Universidad de Málaga.",
               "Localización y representación geométrica de la planta de todas y cada una de los distintos edificios y zonas pertenecientes a la Universidad de Málaga. Indica además su estado actual, incluyendo los futuros proyectos de remodelación, expansión y/o reforma.",
               "Localización de los parkings para bicicletas/patinetes eléctricos en los distintos campus de la Universidad.",
               "Muestra de los equipos de climatización inventariados en los distintos edificios de la Universidad."];
}

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
    if(type.localeCompare(tipos[3]) == 0){
        //Zonas
        var atributos = ["name", "descripcion", "Estado"];
        var atributosTraducidos = ["Nombre", "Descripción", "Estado"];
    }
    if(type.localeCompare(tipos[4]) == 0){
        //Parkings
        var atributos = ["name", "descripcion"];
        var atributosTraducidos = ["Nombre", "Descripción"];
    }
    if(type.localeCompare(tipos[5]) == 0){
        //Equipos de climatizacion (Solo los presentes en el campus de El Ejido de momento)
        var atributos = ["edificio", "calorpot", "friopot", "exteams", "inteams", "enlace"];
        var atributosTraducidos = ["Edificio", "Potencia Bomba Calor Instalada (kW)",
        "Potencia Frigorifica Instalada (kW)", "Equipos exteriores instalados", "Suma de Unidades interiores asociadas",
        "Enlace"];
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
    /*
    var size = feature.get('features').length;
    var tipoEntidad = feature.get('features')[0].get('name');
    */
    //------------------------------------------------------------------------------------------------------------------
    if (feature.get('name') == 'Zonas') {
        var size = 1;
        var tipoEntidad = feature.get('name');
        var id = feature.getId();
        var datoActual = buscar_x_ID_JSON(obj, id);
        var type = datoActual.type;
        var geo = datoActual.location.value.type;
        if (geo == 'Polygon'){
            var coordenadas = feature.getGeometry().getInteriorPoint().getFlatCoordinates();
            var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordenadas));
            var coord = [ol.proj.toLonLat(feature.getGeometry().getInteriorPoint().getFlatCoordinates())[0],
                         ol.proj.toLonLat(feature.getGeometry().getInteriorPoint().getFlatCoordinates())[1]];
        }else {
            var coordenadas = feature.getGeometry().getFlatCoordinates();
            var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordenadas));
            var coord = ol.proj.toLonLat(coordenadas);
        }

    }
    else {
        var size = feature.get('features').length;
        var tipoEntidad = feature.get('features')[0].get('name');
        var pointStyle = getCircleStyle(size, tipoEntidad);

        var coordenadas = feature.get('features')[0].getGeometry().getCoordinates();
        var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordenadas));
        var coord = ol.proj.toLonLat(coordenadas);

        var id = feature.get('features')[0].getId();
        var datoActual = buscar_x_ID_JSON(obj, id);
        var type = datoActual.type;
    }
    //------------------------------------------------------------------------------------------------------------------


    if (size > 1) {
        //Acerco
        //console.log(typeof coordenadas)
        //console.log(coordenadas);
        flyTo(coordenadas, function () {
        });
        selectObject.getFeatures().clear();
        return
    } else {



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

                if (nombreAtributo == "Enlace"){
                    li.innerHTML = '<b>' + nombreAtributo + ': </b><a href=' + datoActual.enlace.value + '>Desglose de información</a>';
                } else {
                    li.innerHTML = '<b>' + nombreAtributo + ': </b>' + datoActual[atributos[i]].value;
                }

                text_Info.appendChild(li);
            } else if (atributos[i].localeCompare("URLImagen") == 0) {
                foto_Info.innerHTML = "<a><img src=" + datoActual.URLImagen.value + " alt=" + id + " style= height:100%;width:100%;image-orientation:from-image; onclick=ampliar(this.src)" + " /></a>";
                if ((datoActual.URLImagen.value).indexOf("youtube") != -1){
                    foto_Info.innerHTML = "<iframe src=" + datoActual.URLImagen.value + " allowfullscreen style=height:330px;width:100%;></iframe>"};
                if ((datoActual.URLImagen.value).indexOf("album") != -1){
                    foto_Info.innerHTML = "<iframe src=" + datoActual.URLImagen.value + " allowfullscreen style=height:330px;width:100%;></iframe>"};
            }
        }
    }
    info.style.display = "flex";
    overlay.setPosition(coordenadas);
    estilo = buscadorEstilosIconSelected(type, feature);
    return estilo;
}

//============= Modal-box para ampliar imagenes =====================================
function ampliar(ruta){
  modal.style.display = "block";
  modalImg.src = ruta;
}

function buscadorEstilosIconSelected(type, feature) {
    var enlace;
    if (type.localeCompare(tipos[0]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Arbol/icon_tree_magenta.png';
    } else if (type.localeCompare(tipos[1]) == 0){
        enlace = 'http://osm.uma.es/Iconos/Bio/Biodiversidad_2.png';
    } else if (type.localeCompare(tipos[2]) == 0){
        enlace = 'http://osm.uma.es/Iconos/Carga/carga2.png';
    } else if (type.localeCompare(tipos[4]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Parking/PB_2.png';
    } else if (type.localeCompare(tipos[5]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Climatizacion/clima2.png';
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

    if (type.localeCompare(tipos[3]) == 0) {
        estilo = Style_Select(feature);
    }

    return estilo;
}

function Style_Select(feature){
    var tipoEntidad = feature.get('name');
    var Atr = feature.get('Atributo');
    var a = (Atr == 'En uso');
    var b = (Atr == 'Proyecto');
    var c = (Atr == 'Obra');
    var d = (Atr == 'Ampliacion y remodelacion');
    if (tipoEntidad.localeCompare(tipos[3]) == 0) {
        var id = feature.getId();
        var datoActual = buscar_x_ID_JSON(obj, id);
        var geometria = datoActual.location.value.type;
        if (geometria == 'Polygon') {
            if (a) {
                estilo = new ol.style.Style({
                    stroke: new ol.style.Stroke({color: 'rgb(0, 150, 255)', width: 3}),
                    fill: new ol.style.Fill({color: 'rgba(0, 255, 200, 0.5)' })
                })
            }else if (b) {
               estilo = new ol.style.Style({
                   stroke: new ol.style.Stroke({color: 'rgb(123, 123, 123)', width: 3}),
                   fill: new ol.style.Fill({color: 'rgba(225, 225, 225, 0.8)' })
               })
            }else if (c) {
               estilo = new ol.style.Style({
                   stroke: new ol.style.Stroke({color: 'rgb(255, 200, 0)', width: 3}),
                   fill: new ol.style.Fill({color: 'rgba(255, 200, 0, 0.3)' })
               })
            }else if (d) {
               estilo = new ol.style.Style({
                   stroke: new ol.style.Stroke({color: 'blue', width: 3}),
                   fill: new ol.style.Fill({color: 'rgba(0, 0, 180, 0.5)' })
               })
            }else{
               estilo = new ol.style.Style({
                  stroke: new ol.style.Stroke({color: 'rgb(255, 180, 255)', width: 3}),
                  fill: new ol.style.Fill({color: 'rgba(255, 180, 255, 0.3)' })
               })
            }
        }else {
            estilo = new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 1,
                    scale: 0.9,
                    src: 'http://osm.uma.es/Iconos/ISV/ISV_2.png'
                })
            });
        }
    }
    return estilo;
}