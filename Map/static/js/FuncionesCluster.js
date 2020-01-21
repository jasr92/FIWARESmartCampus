//FUNCIONES PARA EL CLUSTER***************************************
// this function computes a circle style
// based on the size of a cluster
// the style is cached.
function getCircleStyle(size, tipoEntidad) {
    var color = buscadorEstilosCluster(tipoEntidad)
    var key = tipoEntidad + size;                    //Solventar problema de presentación de entidades en 1ª carga
    if (!cache[key]) {
        if (size > 1) {
            cache[key] = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8 + size / 10,
                    fill: color,
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 2
                    })
                })
            });
        } else {
            cache[key] = buscadorEstilosIcon(tipoEntidad);
        }
    }

    return cache[key];
}

// this function computes a text style
// based on the size of a cluster
// the style is cached
function getTextStyle(text) {
    var key = 'text' + text;
    if (!cache[key]) {
        cache[key] = new ol.style.Style({
            text: new ol.style.Text({
                font: '10px sans-serif',
                text: text,
                textBaseline: 'alphabetic',
                offsetY: 4,
                fill: new ol.style.Fill({
                    color: 'white'
                })
            })
        });
    }
    return cache[key];
}

// the style function for the cluster layer combines
// a circle and a text style based on the size of the cluster
function clusterStyle_1(feature, resolution) {
    var size = feature.get('features').length;
    /* ============================================================================================================== */
    var tipoEntidad= feature.get('features')[0].get('name');
    //var id = obj[0][1].id;
    //var datoActual = buscar_x_ID_JSON(obj, id);
    //var tipoEntidad = datoActual.type;

    /* ============================================================================================================== */

    var pointStyle = getCircleStyle(size, tipoEntidad);
    if (size > 1) {
        var textStyle = getTextStyle(size.toString());
    } else {
        var textStyle = getTextStyle("");
    }

    return [pointStyle, textStyle];
}
function clusterStyle_2(feature, resolution) {
    var size = feature.get('features').length;
    /* ============================================================================================================== */
    var tipoEntidad = feature.get('features')[0].get('name');
    //var id = obj[1][1].id;
    //var datoActual = buscar_x_ID_JSON(obj, id);
    //var tipoEntidad = datoActual.type;

    /* ============================================================================================================== */

    var pointStyle = getCircleStyle(size, tipoEntidad);
    if (size > 1) {
        var textStyle = getTextStyle(size.toString());
    } else {
        var textStyle = getTextStyle("");
    }

    return [pointStyle, textStyle];
}
function clusterStyle_3(feature, resolution) {
    var size = feature.get('features').length;
    /* ============================================================================================================== */
    var tipoEntidad = feature.get('features')[0].get('name');
    //var id = obj[1][1].id;
    //var datoActual = buscar_x_ID_JSON(obj, id);
    //var tipoEntidad = datoActual.type;

    /* ============================================================================================================== */

    var pointStyle = getCircleStyle(size, tipoEntidad);
    if (size > 1) {
        var textStyle = getTextStyle(size.toString());
    } else {
        var textStyle = getTextStyle("");
    }

    return [pointStyle, textStyle];
}

function buscadorEstilosIcon(tipoEntidad) {
    var enlace;
    if (tipoEntidad.localeCompare(tipos[0]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Arbol/icon_tree_color.png';
    } else if (tipoEntidad.localeCompare(tipos[1]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Bio/Biodiversidad.png';
    } else if (tipoEntidad.localeCompare(tipos[2]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Carga/carga1.png';
    } else {
        enlace = 'http://osm.uma.es/Iconos/Default/interrogacion.png';
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

/*------------------ COLOR DE RELLENO PARA LOS CLUSTER DE ENTIDADES------------------*/
function buscadorEstilosCluster(type) {
    var color_relleno;
    if (type.localeCompare(tipos[0]) == 0) {
        color_relleno = 'rgb(0, 52, 107)';
    } else if (type.localeCompare(tipos[1]) == 0){
        color_relleno = 'rgb(0, 152, 107)';
    } else if (type.localeCompare(tipos[2]) == 0){
        color_relleno = 'rgb(220, 87, 131)';
    } else {
        color_relleno = 'rgb(51, 204, 204)';
    }


    EstiloRelleno = new ol.style.Fill({
            color: color_relleno
        });

    return EstiloRelleno;
}