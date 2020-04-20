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

function clusterStyle_4(feature, resolution) {
    var size = feature.get('features').length;
    var tipoEntidad = feature.get('features')[0].get('name');
    var pointStyle = getCircleStyle(size, tipoEntidad);
    if (size > 1) {
        var textStyle = getTextStyle(size.toString());
    } else {
        var textStyle = getTextStyle("");
    }

    return [pointStyle, textStyle];
}

function Style_Z(feature){
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
                    stroke: new ol.style.Stroke({color: 'rgb(0, 255, 255)', width: 3}),
                    fill: new ol.style.Fill({color: 'rgba(0, 255, 255, 0.3)' })
                })
            }else if (b) {
               estilo = new ol.style.Style({
                   stroke: new ol.style.Stroke({color: 'rgb(182, 182, 182)', width: 3}),
                   fill: new ol.style.Fill({color: 'rgba(255, 255, 255, 0.8)' })
               })
            }else if (c) {
               estilo = new ol.style.Style({
                   stroke: new ol.style.Stroke({color: 'rgb(255, 255, 0)', width: 3}),
                   fill: new ol.style.Fill({color: 'rgba(255, 255, 0, 0.3)' })
               })
            }else if (d) {
               estilo = new ol.style.Style({
                   stroke: new ol.style.Stroke({color: 'blue', width: 3}),
                   fill: new ol.style.Fill({color: 'rgba(0, 0, 255, 0.5)' })
               })
            }else {
               estilo = new ol.style.Style({
                  stroke: new ol.style.Stroke({color: 'rgb(255, 0, 255)', width: 3}),
                  fill: new ol.style.Fill({color: 'rgba(255, 0, 255, 0.3)' })
               })
            }
        }else {
            estilo = new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 1,
                    scale: 1,
                    src: 'http://osm.uma.es/Iconos/ISV/ISV_1.png'
                })
            });
        }
    }
    return estilo;
}

function buscadorEstilosIcon(tipoEntidad) {
    var enlace;
    if (tipoEntidad.localeCompare(tipos[0]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Arbol/icon_tree_color.png';
    } else if (tipoEntidad.localeCompare(tipos[1]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Bio/Biodiversidad.png';
    } else if (tipoEntidad.localeCompare(tipos[2]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Carga/carga1.png';
    } else if (tipoEntidad.localeCompare(tipos[4]) == 0) {
        enlace = 'http://osm.uma.es/Iconos/Parking/PB_1.png';
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
    } else if (type.localeCompare(tipos[4]) == 0){
        color_relleno = 'rgb(240, 147, 255)';
    }else {
        color_relleno = 'rgb(51, 204, 204)';
    }


    EstiloRelleno = new ol.style.Fill({
            color: color_relleno
        });

    return EstiloRelleno;
}