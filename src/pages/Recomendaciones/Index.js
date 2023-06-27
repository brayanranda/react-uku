import React, { useRef, useContext, useEffect } from "react";
import { useReactToPrint } from 'react-to-print';
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logoUfps from "../../assets/images/logoUfps.jpg";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AnalisisSueloContext from "../../context/AnalisisSueloContext";
import DosisNutrientes from "./DosisNutrientes";
import DosisNutrientesResponsive from "./DosisNutrientesResponsive";

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
  //     pdf.save('recomendacion-ukulima.pdf');
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
      <div className="w-100 mt-16">
        <Row>
           <Col>
            <div className="flex gap-3 items-center mb-6 justify-between w-100 mt-10 md:mt-6">
              <div className="flex items-center">
                <p className="text-2xl ml-2 text-green-700">Recomendación</p>
              </div>
              <button onClick={handlePrint} className="btn bg-green-700 rounded-md text-white hover:bg-green-800 flex items-center gap-2 font-sm">
                  <FontAwesomeIcon icon={faDownload} /> Descargar
              </button>
            </div>
            <div ref={componentRef}>
              <div className="bg-white p-3 mb-2 rounded-md space-y-5">
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-between">
                  <img className="w-36 md:w-52 mb-4 md:mb-0" src={logo} />
                  <img className="w-36 md:w-60" src={logoUfps} />
                </div>
                <div className="flex justify-between flex-col md:flex-row">
                  <div>
                    <p><b>Nombre: </b> {analisisSuelo.idSuelo?.idLote?.idFinca?.nombre}.</p>
                    <p><b>Lote: </b>  {analisisSuelo.idSuelo?.descripcion}.</p>
                    <p><b>Suelo: </b> {analisisSuelo.idSuelo?.idLote?.descripcion}.</p>
                  </div>
                  <div>
                    <p><b>Fecha: </b>{new Date().toLocaleDateString()}</p>
                    <p><b>Ubicación: </b> Colombia</p>
                  </div>
                </div>
              </div>

              <div className="md:p-3 pb-0 space-y-8">
                <div className="bg-white">
                  <p className="w-100 bg-gray-300 px-3 pt-3 font-medium text-lg">Recomendación de aplicación de cal (Encalado del suelo)</p>
                  <p className="w-100 bg-gray-300 px-3 pb-3 text-md">
                    Nota: Seleccione a su consideración una de las siguientes recomendaciones.
                  </p>

                  <div className="w-100 md:flex gap-4 p-4">
                    {
                      analisisSuelo && analisisSuelo.recomendacionCollection && 
                      analisisSuelo.recomendacionCollection.length !== 0 && analisisSuelo.recomendacionCollection[0].enmiendaRecomendacionEntityCollection &&
                      analisisSuelo.recomendacionCollection[0].enmiendaRecomendacionEntityCollection.length > 0 ?
                        analisisSuelo.recomendacionCollection[0].enmiendaRecomendacionEntityCollection.map((element, index) => 
                          <div key={index} className="md:w-1/4 border-b-2 md:border-b-0 md:border-r-2 border-none-last py-3 md:py-0">
                            <p className="font-bold">{element?.enmienda?.nombre}</p>
                            <p>{element.valor}</p>
                          </div>
                        ) : <p>No se recomienda aplicar encalado debido a que su pH del suelo no necesita corregir su acidez.</p>
                    }
                  </div>
                </div>

                <Row>
                  <Col md={6}>
                    <div className="bg-white">
                      <p className="w-100 bg-gray-300 px-3 pt-3 font-medium text-lg">Recomendación de aplicación de abono orgánico (Encalado del suelo)</p>
                      <p className="w-100 bg-gray-300 px-3 pb-3 text-md">
                        Nota: Seleccione a su consideración una de las siguientes recomendaciones.
                      </p>
                      <div className="w-100 md:flex gap-4 p-4">
                        {
                          analisisSuelo && analisisSuelo.recomendacionCollection && 
                          analisisSuelo.recomendacionCollection.length !== 0 && analisisSuelo.recomendacionCollection[0].abonoOrganicoRecomendacionCollection &&
                          analisisSuelo.recomendacionCollection[0].abonoOrganicoRecomendacionCollection.length > 0 &&
                            analisisSuelo.recomendacionCollection[0].abonoOrganicoRecomendacionCollection.map((element, index) => 
                              <div key={index} className="md:w-1/4 border-b-2 md:border-b-0 md:border-r-2 border-none-last py-3 md:py-0">
                                <p className="font-bold">{element?.idAbonoOrganico?.descripcion} (Kg/Ha)</p>
                                <p>{element.cantidad}</p>
                              </div>
                            )
                        }
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="bg-white">
                      <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Recomendación de aplicación de materia orgánica (M.O.)</p>
                      <div className="bg-white md:flex gap-4 p-4">
                        <p className="font-bold">Materia orgánica (kg /ha): </p>
                        {
                          analisisSuelo && analisisSuelo.recomendacionCollection && analisisSuelo.recomendacionCollection.length > 0 && 
                            <div className="flex flex-col">
                              <p className="font-bold">
                                {analisisSuelo?.recomendacionCollection[0]?.materiaOrganica}
                              </p>
                              {
                                analisisSuelo?.recomendacionCollection[0]?.materiaOrganica === 0 &&
                                  <p>
                                    (No se recomienda aplicar materia organica debido a que la interpretación de la Materia orgánica es ALTA.)
                                  </p>
                              }
                            </div> 
                        }
                      </div>
                    </div>
                  </Col>
                </Row>
                
                <div className="bg-white">
                  <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Recomendación de Uso de Bioinsumos:</p>
                  <div className="p-4 space-y-5">
                    <p>
                      Se refiere al uso de microorganismos benéficos que ayudan a mejorar las condiciones biológicas del suelo y favorecen el crecimiento de las raíces de las plantas, y ayudan a lograr una buena producción.
                    </p>
                    <ul className="space-y-5">
                      <li>
                        <p className="font-bold">Aplicación de Micorrizas:</p>
                         Para todos los suelos se debe recomendar la aplicación de este bioinsumo. Se aplica al momento de la siembra del cultivo. Su forma de aplicación debe atender las indicaciones del fabricante del producto utilizado.
                      </li>
                      <li>
                        <p className="font-bold">Aplicación del hongo Trichoderma spp. :</p>
                         Para todos los suelos se debe recomendar la aplicación de este bioinsumo. Se aplica al inicio del ciclo de cultivo, en aspersión dirigida al suelo cuando el cultivo tenga de 8 a 15 días de sembrado. Y se repite en aspersión dirigida al suelo al transcurrir 15 días de la primera aplicación. Se debe usar la dosis indicada por el fabricante.
                      </li>
                      <li>
                        <p className="font-bold">Aplicación del hongo Paecilomyces lilacinus:</p>
                        Para todos los suelos se debe recomendar la aplicación de este bioinsumo. Se aplica al inicio del ciclo de cultivo, en aspersión dirigida al suelo cuando el cultivo tenga de 18 a 21 días de sembrado. Y se repite en aspersión dirigida al suelo al transcurrir 30 días de la primera aplicación. Se debe usar la dosis indicada por el fabricante.
                      </li>
                      <li>
                        <p className="font-bold">Aplicación de microorganismos Solubilizadores de Fosforo:</p>
                        para todos los suelos se debe recomendar la aplicación de este bioinsumo. Se aplica al momento de la siembra del cultivo y a la mitad del ciclo. Su forma de aplicación debe atender las indicaciones del fabricante del producto utilizado.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white">
                  <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Dosis de nutrientes</p>
                  <div className="hidden md:block">
                    <DosisNutrientes analisisSuelo={analisisSuelo} />
                  </div>
                  <div className="block md:hidden">
                    <DosisNutrientesResponsive analisisSuelo={analisisSuelo} />
                  </div>
                </div>
                
                <div className="bg-white">
                  <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Recomendación de Labranza</p>
                  <div className="bg-white flex items-center gap-4 p-4">
                    <p className="font-bold">Tipo de labranza: </p>
                    {
                      analisisSuelo && analisisSuelo.recomendacionCollection && 
                      analisisSuelo.recomendacionCollection.length !== 0 &&
                        <p>{analisisSuelo?.recomendacionCollection[0]?.labranza}</p>
                    }
                  </div>
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
