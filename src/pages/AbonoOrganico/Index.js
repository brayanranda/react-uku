import React, { useState, useContext } from "react";
import { Col, Row } from "reactstrap";
import AbonoOrganicoContext from "../../context/AbonoOrganicoContext";
import FormPost from "./FormPost";
import ListVariedades from "./List";

const Index = () => {
  const { getAbonosOrganicos, abonosOrganicos, isLoading } =
    useContext(AbonoOrganicoContext);
  const [isFormPost, setIsFormPost] = useState(false);
  const [updateOrAdd, setUpdateOrAdd] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };
  const toggleFormPost = () => {
    setIsFormPost(!isFormPost);
  };

  return (
    <div className="col-12 col-lg-10 fixed top-0 right-0 p-4 overflow-y-scroll max-h-screen">
      <div className="w-100 mt-16">
        <Row>
          <Col>
            <div className="flex items-center mb-4 justify-between w-100">
              <div className="flex items-center">
                
                
                <p className="text-2xl ml-2 text-green-700">
                  Lista Abonos Organicos
                </p>
              </div>
              <div className="md:w-25 lg:w-2/6 xl:w-50 mr-4 ml-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por descripcion"
                  value={search}
                  onChange={onSearchChange}
                />
              </div>
            </div>
            <ListVariedades
              getAbonosOrganicos={getAbonosOrganicos}
              abonosOrganicos={abonosOrganicos}
              updateOrAdd={updateOrAdd}
              setUpdateOrAdd={setUpdateOrAdd}
              isLoading={isLoading}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              search={search}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
