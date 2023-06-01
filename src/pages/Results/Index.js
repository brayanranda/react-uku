import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ListClaseTextural from "./ListClaseTextural";
import ListGrupoTextural from "./ListGrupoTextural";
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
    if(id) {
      getAnalisisSuelo(id)
    }
  }, [id])

  // const generarPDF = () => {
  //   const tabla = document.getElementById('tabla');
  //   const tablaHeight = tabla.clientHeight;
  //   const pageHeight = 790; // Altura máxima de la página PDF (ajústalo según tus necesidades)
  //   let posicionVertical = 0;
  
  //   const pdf = new jsPDF();
  
  //   const generarPagina = () => {
  //     html2canvas(tabla, {
  //       y: posicionVertical,
  //       height: pageHeight,
  //     }).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const imgWidth = 180; // Ancho de la imagen en el PDF (ajústalo según tus necesidades)
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  //       pdf.addPage();
  //       pdf.addImage(imgData, 'PNG', (pdf.internal.pageSize.getWidth() - imgWidth) / 2, 15, imgWidth, imgHeight);
  
  //       posicionVertical += pageHeight;
  
  //       if (posicionVertical < tablaHeight) {
  //         generarPagina();
  //       } else {
  //         pdf.save('tabla.pdf');
  //       }
  //     });
  //   };
  
  //   generarPagina();
  // }

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
              <div className="mb-2">
                <p className="font-bold">Determinación de la Clase textural</p>
                <p>Con los datos del %Arena, %Limo y %Arcilla, se determina la clase textural del suelo, con los rangos de la siguiente tabla</p>
              </div>
              <ListClaseTextural analisisSuelo={analisisSuelo} />

              <div className="mt-14 mb-2">
                <p className="font-bold">Determinación del Grupo Textural</p>
                <p>Con la clase textural se determina el grupo textural del suelo, de acuerdo a la siguiente tabla</p>
              </div>
              <ListGrupoTextural analisisSuelo={analisisSuelo} />

              <div className="mt-14 mb-2">
                <p className="font-bold">Densidad Aparente del Suelo:</p>
                <p>Esta variable se le pide al usuario. Pero si no es ingresado el valor de la densidad aparente, entonces el sistema lo asigna a partir de la siguiente tabla:</p>
              </div>
              <ListDensidadSuelo analisisSuelo={analisisSuelo} />

              <div className="mt-14 mb-2">
                <p className="font-bold">Interpretación del pH del suelo:</p>
                <p>Esta variable se pide al usuario y se interpreta de acuerdo a la siguiente tabla:</p>
              </div>
              <InterpretaciónpHSuelo analisisSuelo={analisisSuelo} />

              <div className="mt-14 mb-2">
                <p className="font-bold">Interpretación del aluminio intercambiable:</p>
                <p>Este dato se le solicita al usuario y es opcional. Si es cargado el dato se interpreta a partir de la siguiente tabla:</p>
              </div>
              <InterpretacionAluminioIntercambiable analisisSuelo={analisisSuelo} />

              <div className="mt-14 mb-2">
                <p className="font-bold">Interpretación de la Conductividad Eléctrica (C.E.):</p>
                <p>Este dato se le solicita al usuario y es opcional. Si es cargado el dato se interpreta a partir de la siguiente tabla: </p>
              </div>
              <InterpretacionConductividadElectricaCE analisisSuelo={analisisSuelo} />

              <div className="mt-14 mb-2">
                <p className="font-bold">Interpretación de la Materia orgánica (M.O.):</p>
                <p>Este dato se le solicita al usuario y se interpreta de acuerdo a la siguiente tabla:</p>
              </div>
              <InterpretacionMateriaOrganicaMO analisisSuelo={analisisSuelo} />

              <div className="mt-14 mb-2">
                <p className="font-bold">Interpretación de la Capacidad de Intercambio Catiónico (CIC):</p>
                <p>Este dato se le solicita al usuario y es opcional. Si es cargado se interpreta de acuerdo a la siguiente tabla:</p>
              </div>
              <InterpretacionCapacidadIntercambioCationicoCIC analisisSuelo={analisisSuelo} />

              <div className="mt-14 mb-2">
                <p className="font-bold">Interpretación de la Disponibilidad de nutrientes:</p>
                <p>Estos datos se le solicitan al usuario y son opcionales. Si son cargados se interpretan de acuerdo a la siguiente tabla:</p>
              </div>
              <InterpretacionDisponibilidadNutrientes analisisSuelo={analisisSuelo} />

              <div className="mt-14 mb-2">
                <p className="font-bold">Interpretación de las Relaciones de Bases del Suelo:</p>
                <p>Se realiza a partir de los datos del análisis de suelo, referidos al Ca, Mg, K y Na.</p>
              </div>
              <InterpretacionRelacionesBasesSuelo analisisSuelo={analisisSuelo} />
            </div>
          </Col>
        </Row>
      </div>
      {/* <Mapa /> */}
    </div>
  );
};

export default Index;
