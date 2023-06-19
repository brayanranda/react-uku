import React, { useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logoUfps from "../../assets/images/logoUfps.jpg";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import RecomendacionLabranza from "./RecomendacionLabranza";
import AnalisisSueloContext from "../../context/AnalisisSueloContext";
import DosisNutrientes from "./DosisNutrientes";

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
      pdf.save('recomendacion-ukulima.pdf');
    })
  }

  useEffect(() => {
    if(id && id !== "") {
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
                <p className="text-2xl ml-2 text-green-700">Recomendación</p>
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
                <div className="bg-white">
                  <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Recomendación de aplicación de cal (Encalado del suelo)</p>
                  <div className="w-100 flex gap-4 p-4">
                    {
                      analisisSuelo && analisisSuelo.recomendacionCollection && 
                      analisisSuelo.recomendacionCollection.length !== 0 && analisisSuelo.recomendacionCollection[0].enmiendaRecomendacionEntityCollection &&
                      analisisSuelo.recomendacionCollection[0].enmiendaRecomendacionEntityCollection.length > 0 &&
                        analisisSuelo.recomendacionCollection[0].enmiendaRecomendacionEntityCollection.map((element, index) => 
                          <div key={index} className="w-1/4 border-r-2 border-none-last">
                            <p className="font-bold">{element?.enmienda?.nombre}</p>
                            <p>{element.valor}</p>
                          </div>
                        )
                    }
                  </div>
                </div>

                {/* <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Recomendación de aplicación de materia orgánica (M.O.)</p>
                <div className="w-100 flex gap-4 items-end">
                  <div className="w-100">
                    <p className="font-bold mb-4">Calculo del peso del suelo (kg/ha)</p>
                    <p>Densidad aparente * 10000*Prof. Suelo * 1000</p>
                  </div>
                  <div className="w-100">
                    <p className="font-bold mb-4">Materia orgánica (kg /ha)</p>
                    <p>Peso del suelo * Diferencial entre la M.O. / 100</p>
                  </div>
                </div> */}

                <div className="bg-white">
                  <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Recomendación de aplicación de cal (Encalado del suelo)</p>
                  <div className="w-100 flex gap-4 p-4">
                    {
                      analisisSuelo && analisisSuelo.recomendacionCollection && 
                      analisisSuelo.recomendacionCollection.length !== 0 && analisisSuelo.recomendacionCollection[0].abonoOrganicoRecomendacionCollection &&
                      analisisSuelo.recomendacionCollection[0].abonoOrganicoRecomendacionCollection.length > 0 &&
                        analisisSuelo.recomendacionCollection[0].abonoOrganicoRecomendacionCollection.map((element, index) => 
                          <div key={index} className="w-1/4 border-r-2 border-none-last">
                            <p className="font-bold">{element?.idAbonoOrganico?.descripcion}</p>
                            <p>{element.cantidad}</p>
                          </div>
                        )
                    }
                  </div>
                </div>
                
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
                  <DosisNutrientes analisisSuelo={analisisSuelo} />
                </div>
                
                <div>
                  <p className="w-100 bg-gray-300 p-3 font-medium text-lg">Recomendación de Labranza</p>
                  <RecomendacionLabranza analisisSuelo={analisisSuelo} />
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
