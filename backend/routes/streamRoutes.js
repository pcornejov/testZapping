const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

let mediaSequence = 0; 
const totalSegments = 64;

/**
 * @route GET /playlist
 * @description Genera y devuelve una lista de reproducción HLS (M3U8) dinámica.
 * @access Público
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {String} Lista de reproducción HLS en formato M3U8.
 */
router.get("/playlist", (req, res) => {
    const segmentCount = 3; 
    const startIndex = mediaSequence; 
    const playlist = [
        "#EXTM3U",
        "#EXT-X-VERSION:3",
        "#EXT-X-TARGETDURATION:10",
        `#EXT-X-MEDIA-SEQUENCE:${mediaSequence}`,
    ];

    for (let i = 0; i < segmentCount; i++) {
        const segmentIndex = (startIndex + i) % totalSegments;
        playlist.push("#EXTINF:10.000000,");
        playlist.push(`segments/segment${segmentIndex}.ts`);
    }
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(playlist.join("\n"));
    setTimeout(() => {
        mediaSequence++; 
        if (mediaSequence >= totalSegments) {
            mediaSequence = 0; 
        }
    }, 10000);
});

/**
 * @route GET /segments/:segment
 * @description Devuelve un segmento de video HLS específico.
 * @access Público
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.params - Contiene los parámetros de la solicitud.
 * @param {String} req.params.segment - Nombre del archivo de segmento solicitado.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {File} Archivo de segmento de video o un mensaje de error si no se encuentra.
 */
router.get("/segments/:segment", (req, res) => {
    const segmentPath = path.join(__dirname, "../hls", req.params.segment);
    console.log(segmentPath);
    if (fs.existsSync(segmentPath)) {
        res.sendFile(segmentPath);
    } else {
        res.status(404).send("Segmento no encontrado");
    }
});

module.exports = router;
