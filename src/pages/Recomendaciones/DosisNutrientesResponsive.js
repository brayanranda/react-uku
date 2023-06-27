import React from "react";

const DosisNutrientesResponsive = ({analisisSuelo}) => {
    
    return (
        <div className="flex">
            <ul className="p-2">
                <li className="font-bold">Nutrientes</li>
                {
                    analisisSuelo && analisisSuelo.recomendacionCollection && 
                    analisisSuelo.recomendacionCollection.length !== 0 && analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities &&
                    analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.length > 0 &&
                        analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.map((element, index) => 
                            <li>{element?.elemento?.nombre.toLowerCase()}</li>
                        )
                }
            </ul>
            <ul className="p-2">
                <li className="font-bold">Dosis (kg/ha)</li>
                {
                    analisisSuelo && analisisSuelo.recomendacionCollection && 
                    analisisSuelo.recomendacionCollection.length !== 0 && analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities &&
                    analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.length > 0 &&
                        analisisSuelo.recomendacionCollection[0].abonoQuimicoRecomendacionEntities.map((element, index) => 
                            <li>{element.dosis}</li>
                        )
                }
            </ul>
        </div>
    )
}

export default DosisNutrientesResponsive;
