import React, { useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ListClaseTextural from "./ListClaseTextural";
import ListDensidadSuelo from "./ListDensidadSuelo";
import InterpretaciónpHSuelo from "./InterpretaciónpHSuelo";
import InterpretacionDisponibilidadNutrientes from "./InterpretacionDisponibilidadNutrientes";
import InterpretacionRelacionesBasesSuelo from "./InterpretacionRelacionesBasesSuelo";
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
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, 15, imgWidth, imgHeight);
      pdf.save('interpretacion-ukulima.pdf');
    })
  }

  useEffect(() => {
    if(id && id !== "") {
      getAnalisisSuelo(id)
    }
  }, [id])

  return (
    <div className="col-12 col-lg-10 fixed top-0 right-0 p-4 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        <Row>
           <Col>
            <div className="md:flex gap-3 items-center mb-6 justify-between w-100 mt-3">
              <div className="flex items-center">
                
                
                <p className="text-2xl ml-2 text-green-700">Interpretación</p>
              </div>
              <button onClick={generarPDF} className="btn bg-green-700 rounded-md text-white hover:bg-green-800 flex items-center gap-2 font-sm">
                  <FontAwesomeIcon icon={faDownload} /> Descargar
              </button>
            </div>
            <div id="tabla">
              <div className="bg-white p-3 mb-2 rounded-md space-y-5">
                <div className="flex items-center justify-between">
                  <img className="w-52" src={logo} />
                  <img className="w-60" src={logoUfps} />
                </div>
                <div className="flex justify-between">
                  <div>
                    <p><b>Nombre: </b> Nombre Finca</p>
                    <p><b>Finca/Lote: </b> Lote 001</p>
                  </div>
                  <div>
                    <p><b>Fecha: </b>{new Date().toLocaleDateString()}</p>
                    <p><b>Ubicación: </b> Colombia</p>
                  </div>
                </div>
              </div>

              <div className="p-3 pb-0 space-y-8">
                <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Reporte del análisis de suelo</p>
                <div className="w-100 flex gap-4 items-end">
                  <div className="w-3/4">
                    <p className="font-bold mb-4">Textura del suelo</p>
                    <ListClaseTextural analisisSuelo={analisisSuelo} />
                  </div>
                  <div className="w-1/4">
                    <ListDensidadSuelo analisisSuelo={analisisSuelo} />
                  </div>
                </div>
                <div>
                  <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Características químicas del suelo</p>
                  <InterpretaciónpHSuelo analisisSuelo={analisisSuelo} />
                </div>
                <div>
                  <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Disponibilidad de nutrientes en el suelo</p>
                  <InterpretacionDisponibilidadNutrientes analisisSuelo={analisisSuelo} />
                </div>
                <div>
                  <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Interpretación de las Relaciones de Bases del Suelo</p>
                  <InterpretacionRelacionesBasesSuelo analisisSuelo={analisisSuelo} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
