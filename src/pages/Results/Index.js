import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ListClaseTextural from "./ListClaseTextural";
import ListDensidadSuelo from "./ListDensidadSuelo";
import InterpretaciónpHSuelo from "./InterpretaciónpHSuelo";
import InterpretacionAluminioIntercambiable from "./InterpretacionAluminioIntercambiable";
import InterpretacionConductividadElectricaCE from "./InterpretacionConductividadElectricaCE";
import InterpretacionMateriaOrganicaMO from "./InterpretacionMateriaOrganicaMO";
import InterpretacionCapacidadIntercambioCationicoCIC from "./InterpretacionCapacidadIntercambioCationicoCIC";
import InterpretacionDisponibilidadNutrientes from "./InterpretacionDisponibilidadNutrientes";
import InterpretacionRelacionesBasesSuelo from "./InterpretacionRelacionesBasesSuelo";
import Mapa from "../Mapa/Mapa";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logoUfps from "../../assets/images/logoUfps.jpg";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AnalisisSueloContext from "../../context/AnalisisSueloContext";

const Index = () => {
  let { id } = useParams()
  const {getAnalisisSuelo, analisisSuelo} = useContext(AnalisisSueloContext);

  const generarPDF = () => {
    const tabla = document.getElementById('tabla');
    html2canvas(tabla).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, 15, imgWidth, imgHeight);
      pdf.save('tabla.pdf');
    })
  }

  useEffect(() => {
    if(id && id !== "") {
      console.log("entre22");
      getAnalisisSuelo(id)
    }
  }, [id])

  return (
    <div className="col-10 fixed top-0 right-0 p-5 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        <Row>
          <Col className="col-uku">
            <div className="flex items-center mb-4 justify-between w-100 mt-3">
              <div className="flex items-center">
                <p className="text-2xl mr-2">Inicio</p>
                <p className="text-2xl">/</p>
                <p className="text-2xl ml-2 text-green-700">Lista Resultados</p>
              </div>
              <button onClick={generarPDF} className="bg-green-700 rounded-md py-1 px-2 text-white hover:bg-green-700 flex items-center gap-2 font-sm">
                  <FontAwesomeIcon
                    className="cursor-pointer duration-300 transform hover:scale-105 rounded-md hover:bg-green-200 hover:text-green-800"
                    icon={faDownload}
                  />
                Descargar
              </button>
            </div>
            <div id="tabla">
              <div className="bg-white p-3 mb-2 rounded-md flex items-center justify-between">
                <img className="w-52" src={logo} />
                <img className="w-60" src={logoUfps} />
              </div>
              <div className="p-3 pb-0 space-y-8">
                <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Reporte del análisis de suelo</p>

                <div className="w-100 flex gap-4 items-end">
                  <div className="w-3/4">
                    <p className="font-bold">Textura del suelo</p>
                    <ListClaseTextural analisisSuelo={analisisSuelo} />
                  </div>
                  <div className="w-1/4">
                    <ListDensidadSuelo analisisSuelo={analisisSuelo} />
                  </div>
                </div>

                <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Características químicas del suelo</p>

                <p className="font-bold mb-2">Interpretación del pH del suelo:</p>
                <InterpretaciónpHSuelo analisisSuelo={analisisSuelo} />

                <p className="font-bold mb-2">Interpretación del aluminio intercambiable:</p>
                <InterpretacionAluminioIntercambiable analisisSuelo={analisisSuelo} />

                <p className="font-bold mb-2">Interpretación de la Conductividad Eléctrica (C.E.):</p>
                <InterpretacionConductividadElectricaCE analisisSuelo={analisisSuelo} />

                <p className="font-bold mb-2">Interpretación de la Materia orgánica (M.O.):</p>
                <InterpretacionMateriaOrganicaMO analisisSuelo={analisisSuelo} />

                <p className="font-bold mb-2">Interpretación de la Capacidad de Intercambio Catiónico (CIC):</p>
                <InterpretacionCapacidadIntercambioCationicoCIC analisisSuelo={analisisSuelo} />

                <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Disponibilidad de nutrientes en el suelo</p>
                <InterpretacionDisponibilidadNutrientes analisisSuelo={analisisSuelo} />

                <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Interpretación de las Relaciones de Bases del Suelo</p>
                <InterpretacionRelacionesBasesSuelo analisisSuelo={analisisSuelo} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* <Mapa /> */}
    </div>
  );
};

export default Index;
