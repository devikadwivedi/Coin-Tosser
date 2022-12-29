/**
 * Name: Devika Dwivedi
 * Date: 10/19/2022
 * Section: CSE 154 AC
 * TA: Allison Ho
 * This is a JS to implement the UI for a random coin flipper and
 */
"use strict";
(function() {
  window.addEventListener("load", init);
  const COIN = ["heads", "tails"];
  let flipCount = 0;
  let headCount = 0;

  /**
   * sets up necessary functionality when page loads
   */
  function init() {
    let flipButton = qsa("button")[1];
    flipButton.addEventListener("click", flipCoin);
    let resetButton = qsa("button")[0];
    resetButton.addEventListener("click", resetCoin);
  }

  /**
   * resets all information on the page to the starting state
   */
  function resetCoin() {
    // remove heading
    if (flipCount === 0) {
      return;
    }
    qsa("section")[2].classList.add("stats");
    qsa("button")[1].classList.remove("changetheme");
    resetHeading();

    // restores the original image onto the page
    let newImg = gen("img");
    newImg.src = "coinflip.jpg";
    newImg.alt = "hand flips a coin";

    // restores the flip counts to zero
    let ogImg = qsa("img")[2];
    id("photobuttons").replaceChild(newImg, ogImg);
    flipCount = 0;
    headCount = 0;
    trackCount();
  }

  /**
   * flips a coin randomly and updates the header, photo, and total counts
   */
  function flipCoin() {
    // Remove heading if it already exists
    resetHeading();
    qsa("button")[1].classList.toggle("changetheme");
    qsa("section")[2].classList.remove("stats");

    // randomly finds heads or tails
    let randomNum = Math.floor(Math.random() * COIN.length);

    // create image
    let newImg = gen("img");
    newImg.src = COIN[randomNum] + '.jpg';
    newImg.alt = COIN[randomNum] + ' side of a coin';

    // creates text
    let ans = gen("h2");
    ans.textContent = COIN[randomNum] + "!";

    // appends image and text
    let ogImg = qsa("img")[2];
    id("photobuttons").replaceChild(newImg, ogImg);
    id("photobuttons").insertBefore(ans, newImg);

    flipCount++;
    if (COIN[randomNum] === "heads") {
      headCount++;
    }
    trackCount();
  }

  /**
   * removes the previos flip's answer from page
   */
  function resetHeading() {
    let ansO = qs("h2");
    if (!(ansO === null)) {
      id("photobuttons").removeChild(ansO);
    }
  }

  /**
   * updates the total number of flips, head flips, and tail flips on the page
   */
  function trackCount() {
    qsa("span")[0].textContent = flipCount;
    qsa("span")[1].textContent = headCount;
    qsa("span")[2].textContent = flipCount - headCount;
  }

  /**
   * Returns the desired element node
   * @param {string} tag - the name of the tag to create
   * @returns {object} the desired element node
   */
  function gen(tag) {
    return document.createElement(tag);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching the given CSS selector.
   * @param {string} selector - CSS selector.
   * @returns {object} - object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements that match the given CSS selector.
   * @param {string} selector - CSS selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

})();
