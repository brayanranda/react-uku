import React, { useRef, useContext, useEffect } from "react";
import { useReactToPrint } from 'react-to-print';

import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faDownload } from "@fortawesome/free-solid-svg-icons";
import ListClaseTextural from "./ListClaseTextural";
import ListDensidadSuelo from "./ListDensidadSuelo";
import InterpretaciónpHSuelo from "./InterpretaciónpHSuelo";
import InterpretacionDisponibilidadNutrientes from "./InterpretacionDisponibilidadNutrientes";
import InterpretacionRelacionesBasesSuelo from "./InterpretacionRelacionesBasesSuelo";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logoUfps from "../../assets/images/logoUfps.jpg";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AnalisisSueloContext from "../../context/AnalisisSueloContext";


const Index = () => {
  const componentRef = useRef();

  let { id } = useParams()
  const {getAnalisisSuelo, analisisSuelo} = useContext(AnalisisSueloContext);

  // const generarPDF = () => {
  //   const tabla = document.getElementById('tabla');
  //   html2canvas(tabla).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const imgWidth = 180;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     pdf.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, 15, imgWidth, imgHeight);
  //     pdf.save('interpretacion-ukulima.pdf');
  //   })
  // }

  useEffect(() => {
    if(id && id !== "") {
      getAnalisisSuelo(id)
    }
  }, [id])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page {
      margin: 0.5cm;
    }

    body {
      padding: 0;
      margin: 0;
    }`
  })

  return (
    <div className="col-12 col-lg-10 fixed top-0 right-0 md:p-4 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16 mb-8 md:mb-4">
        <Row>
           <Col>
            <div className="flex gap-3 items-center mb-6 justify-between w-100 mt-10 md:mt-6">
              <div className="flex items-center">
                <p className="text-xl md:text-2xl ml-2 text-green-700">Interpretación</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/recomendaciones/${id}`}
                  className="btn bg-gray-700 rounded-md text-white hover:bg-gray-800 md:flex items-center gap-2 font-sm"
                >
                  <FontAwesomeIcon icon={faBook} />
                  Ver Recomendación
                </Link>
                <button
                      onClick={() => {handlePrint()}}
                    className="hidden btn bg-green-700 rounded-md text-white hover:bg-green-800 md:flex items-center gap-2 font-sm">
                    <FontAwesomeIcon icon={faDownload} /> Descargar
                </button>
              </div>
            </div>
            
            <div ref={componentRef}>
              <div className="bg-white p-3 mb-2 rounded-md space-y-5">
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-between">
                  <img className="w-36 md:w-52 mb-4 md:mb-0" src={logo} />
                  <img className="w-36 md:w-60" src={logoUfps} />
                </div>
                <div className="flex justify-between flex-col md:flex-row">
                  <div>
                    <p><b>Nombre: </b> {analisisSuelo.idSuelo?.idLote?.idFinca?.nombre}</p>
                    <p><b>Lote</b>  {analisisSuelo.idSuelo?.descripcion}</p>
                    <p><b>Suelo</b> {analisisSuelo.idSuelo?.idLote?.descripcion}</p>
                  </div>
                  <div>
                    <p><b>Fecha: </b>{new Date().toLocaleDateString()}</p>
                    <p><b>Ubicación: </b> Colombia</p>
                  </div>
                </div>
              </div>

              <div className="md:p-3 pb-0 space-y-8">
                <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Reporte del análisis de suelo</p>
                <div className="w-100 md:flex gap-4 items-end">
                  <div className="w-full md:w-3/4">
                    <p className="font-bold mb-4">Textura del suelo</p>
                    <ListClaseTextural analisisSuelo={analisisSuelo} />
                  </div>
                  <div className="w-full md:w-1/4">
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
                <div className="mb-14 md:mb-0">
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
