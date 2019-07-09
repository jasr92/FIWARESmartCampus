//FUNCIONES PARA EL CLUSTER***************************************
// this function computes a circle style
// based on the size of a cluster
// the style is cached.
function getCircleStyle(size) {
    var key = 'circle' + size;
    if (!cache[key]) {
        if (size > 1) {
            cache[key] = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8 + size / 10,
                    fill: new ol.style.Fill({
                        color: 'rgb(0, 52, 107)'

                    }),
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 2
                    })
                })
            });
        } else {
            cache[key] = new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 1,
                    scale: 0.5,
                    src: 'http://osm.uma.es/Iconos/Arbol/icon_tree_color.png'

                })
            });
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
function clusterStyle(feature, resolution) {
    var size = feature.get('features').length;
    var pointStyle = getCircleStyle(size);
    if (size > 1) {
        var textStyle = getTextStyle(size.toString());
    } else {
        var textStyle = getTextStyle("");
    }

    return [pointStyle, textStyle];
}