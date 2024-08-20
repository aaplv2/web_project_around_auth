import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import api from "../utils/api.js";

import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CurrentCardContext } from "../contexts/CurrentCardContext.js";
import { PopupContext } from "../contexts/PopupProvider.js";

function App() {
  const [isAddPlacePopoutOpen, setIsAddPlacePopoutOpen] = useState(false);
  const [isEditAvatarPopoutOpen, setIsEditAvatarPopoutOpen] = useState(false);
  const [isEditProfilePopoutOpen, setIsEditProfilePopoutOpen] = useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const [isZoomImageOpen, setIsZoomImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
    api.getInitialCards().then((data) => {
      setCurrentCards(data);
    });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopoutOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopoutOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopoutOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setIsDeleteCardOpen(true);
  };

  const handleZoomImageClick = (card) => {
    setSelectedCard(card);
    setIsZoomImageOpen(true);
  };
  const closeAllPopouts = () => {
    setIsAddPlacePopoutOpen(false);
    setIsEditAvatarPopoutOpen(false);
    setIsEditProfilePopoutOpen(false);
    setIsDeleteCardOpen(false);
    setIsZoomImageOpen(false);
    setSelectedCard({});
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((cardId) => cardId._id === currentUser._id);
    api.handleLike(card._id, !isLiked).then((newCard) => {
      setCurrentCards((cardState) =>
        cardState.map((c) => (c._id === card._id ? newCard : c))
      );
    });
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      const newCards = currentCards.filter((c) => {
        if (card._id === c._id) {
          return false;
        } else {
          return true;
        }
      });
      setCurrentCards(newCards);
      closeAllPopouts();
    });
  };

  const handleUpdateUser = (user) => {
    api.updateUserInfo(user.name, user.about).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopouts();
    });
  };

  const handleAvatarUpdate = ({ avatar }) => {
    api.updateAvatar(avatar).then(() => {
      setCurrentUser({ ...currentUser, avatar: avatar });
      closeAllPopouts();
    });
  };

  const handleAddPlace = ({ name, link }) => {
    api.addCard(name, link).then((newCard) => {
      setCurrentCards([newCard, ...currentCards]);
      closeAllPopouts();
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={currentCards}>
        <PopupContext.Provider value={selectedCard}>
          <div className="body">
            <div className="page">
              <Header></Header>
              <Routes>
                <Route path="/signup" />
                <Route path="/signin" />
                <Route path="/" />
              </Routes>
              <Main
                isEditAvatarPopoutOpen={isEditAvatarPopoutOpen}
                isEditProfilePopoutOpen={isEditProfilePopoutOpen}
                isAddPlacePopoutOpen={isAddPlacePopoutOpen}
                isDeleteCardOpen={isDeleteCardOpen}
                isZoomImageOpen={isZoomImageOpen}
                selectedCard={selectedCard}
                onEditAvatarClick={handleEditAvatarClick}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onDeleteCardClick={handleDeleteCardClick}
                onCardClick={handleZoomImageClick}
                onClose={closeAllPopouts}
                onUpdateUser={handleUpdateUser}
                onUpdateAvatar={handleAvatarUpdate}
                onAddPlace={handleAddPlace}
                handleCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              ></Main>
              <Footer></Footer>
            </div>
          </div>
        </PopupContext.Provider>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
