import React from "react";

const DosisNutrientes = ({analisisSuelo}) => {
    
    return (
        <>
            <div className="rounded-2xl bg-white shadow-sm">
                <div className="table-responsive fs-14">
                    <table className="table bg-white">
                        <thead>
                            <tr>
                                <th>Nutrientes</th>
                                {
                                    analisisSuelo && analisisSuelo.recomendacionCollection && 
                                    analisisSuelo.recomendacionCollection.length !== 0 && analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities &&
                                    analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.length > 0 &&
                                    analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.map((element, index) => 
                                        <th>{element?.elemento?.nombre}</th>
                                    )
                                }
                                </tr>
                                <tr>
                                    <th>Unidad</th>
                                    {
                                        analisisSuelo && analisisSuelo.recomendacionCollection && 
                                        analisisSuelo.recomendacionCollection.length !== 0 && analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities &&
                                        analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.length > 0 &&
                                        analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.map((element, index) => 
                                            <th>{element?.elemento?.unidad}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Dosis (kg/ha)</th>
                                    {
                                        analisisSuelo && analisisSuelo.recomendacionCollection && 
                                        analisisSuelo.recomendacionCollection.length !== 0 && analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities &&
                                        analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.length > 0 &&
                                        analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.map((element, index) => 
                                            <td>{element.dosis}</td>
                                        )
                                    }
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </>
    )
}

export default DosisNutrientes;