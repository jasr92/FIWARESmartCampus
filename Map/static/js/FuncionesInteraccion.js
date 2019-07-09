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

function styleSelectArbol(feature, resolution) {
    var size = feature.get('features').length;

    var pointStyle = getCircleStyle(size);
    var coordenadas = feature.get('features')[0].getGeometry().getCoordinates();
    if (size > 1) {
        //Acerco
        console.log(typeof coordenadas)
        console.log(coordenadas);
        flyTo(coordenadas, function () {
        });
        selectArbol.getFeatures().clear();
        return
    } else {
        var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordenadas));
        var coord = ol.proj.toLonLat(coordenadas);

        var id = feature.get('features')[0].getId();

        var datoActual = buscar_x_ID_JSON(obj, id);


        content.innerHTML = '<p>ID: ' + id + '</p>' +
            '<p>Coordenadas: ' + hdms + '</p>' +
            '<p>Coordenadas: ' + coord + '</p>';
        console.log(datoActual.URLImagen.value)

        text_Info.innerHTML = "<p><ul><li><b>Nombre Común: </b>" + datoActual.NombreVulgar.value + "</li>" +
            "<li>Nombre Científico: " + datoActual.NombreCientifico.value + "</li>" +
            "<li>Altura: " + datoActual.Altura.value + "m </li>" +
            "<li>Diámetro tronco: " + datoActual.DiametroTronco.value + " m</<li>" +
            "<li>Diámetro Copa: " + datoActual.DiametroCopa.value + "m </li></ul>";

        foto_Info.innerHTML = "<a><img src=" + datoActual.URLImagen.value + " alt=" + id + "style=height=100%; width=100%; image-orientation: from-image;" + "/> </a>"

        overlay.setPosition(coordenadas);


        estilo = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                scale: 0.5,
                src: 'http://osm.uma.es/Iconos/Arbol/icon_tree_magenta.png'

            })
        });
        return estilo;
    }
}