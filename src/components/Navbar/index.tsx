import { useState, useEffect } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import idFlag from "../../assets/id.png";
import enFlag from "../../assets/en.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [dark, setDark] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (!theme || theme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const darkModeHandler = () => {
    const newDarkMode = !dark;
    setDark(newDarkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "id" : "en";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="navbar py-7 flex items-center justify-between ">
      <div className="logo">
        <h1
          title={t("titleNavbar")}
          className="text-3xl font-bold bg-dark dark:bg-light text-light dark:text-dark p-1 md:bg-transparent md:text-dark dark:md:text-light dark:md:bg-transparent "
        >
          <Link to="/">{t("titleNavbar")}</Link>
        </h1>
      </div>
      <ul
        className={`menu flex items-center sm:gap-10 gap-4 md:static fixed left-1/2 -translate-x-1/2 md:-translate-x-0 md:opacity-100 bg-light/30 backdrop-blur-md p-4 rounded-br-2xl rounded-bl-2xl ${
          active ? "top-0 opacity-100" : "-top-10 opacity-0 md:bg-transparent"
        } z-50`}
      >
        <li>
          <a
            href="#home"
            className="sm:text-lg text-base font-medium dark:hover:text-primary hover:text-secondary"
            title={t("menu1")}
          >
            {t("menu1")}
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="sm:text-lg text-base font-medium dark:hover:text-primary hover:text-secondary"
            title={t("menu2")}
          >
            {t("menu2")}
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="sm:text-lg text-base font-medium dark:hover:text-primary hover:text-secondary"
            title={t("menu3")}
          >
            {t("menu3")}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="sm:text-lg text-base font-medium dark:hover:text-primary hover:text-secondary"
            title={t("menu4")}
          >
            {t("menu4")}
          </a>
        </li>
        <li>
          <a
            className="sm:text-lg text-base font-medium dark:hover:text-primary hover:text-secondary"
            onClick={darkModeHandler}
            title={t("menu5")}
          >
            {dark ? <IoSunny /> : <IoMoon />}
          </a>
        </li>
        <li>
          <img
            src={language === "en" ? idFlag : enFlag}
            alt="Toggle Language"
            className="w-full h-6 cursor-pointer hover:opacity-70 hidden md:block"
            onClick={toggleLanguage}
            title={t("menu6")}
            loading="lazy"
          />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
