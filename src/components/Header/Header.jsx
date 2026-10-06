import styles from "./Header.module.css";
import { logo } from "../../assets/imgs/logo/logo";
import { NavLink } from "react-router-dom";
import ChangeBusiness from "../../assets/icons/IconChangeBusiness";
import { useGlobal } from "../../hooks/useGlobal";

// bases de dados
import ecom_SN from "../../data/dados_SN_Ecom.json";
import lojafisica_SN from "../../data/dados_SN_Loja.json";

export default function Header() {
  const {
    setTypeBusiness,
    setData,
    typeBusiness,
    setSelectedStore,
    setSelectedRating,
    setSelectedDelivery,
  } = useGlobal();

  return (
    <nav className={styles.navBar}>
      <div className="contentRow">
        <NavLink to="/" end>
          <img
            className={styles.logo}
            src={
              typeBusiness !== "LojaF"
                ? logo.supernosso.img
                : logo.supernossoLF.img
            }
            alt={
              typeBusiness !== "LojaF"
                ? logo.supernosso.alt
                : logo.supernossoLF.alt
            }
            title={
              typeBusiness !== "LojaF"
                ? logo.supernosso.title
                : logo.supernossoLF.title
            }
          />
        </NavLink>
        <div className={styles.selectStore}></div>
      </div>
      <div className={styles.listLinks}>
        <NavLink to="/detratores" className={styles.link}>
          <p className="textDefault">Detratores</p>
        </NavLink>
        <NavLink to="/respostas" className={styles.link}>
          <p className="textDefault">Respostas</p>
        </NavLink>
        {typeBusiness !== "LojaF" && (
          <NavLink to="/corte-substituicao" className={styles.link}>
            <p className="textDefault">Corte x Substituição</p>
          </NavLink>
        )}
        <NavLink
          to=""
          className={`${styles.link} ${styles.changeReport}`}
          onClick={() => {
            const isEcom = typeBusiness === "Ecom";
            setData(isEcom ? lojafisica_SN : ecom_SN);
            setTypeBusiness(isEcom ? "LojaF" : "Ecom");
            setSelectedStore({
              nroempresa: true,
              name: "Todas as lojas",
            });
            setSelectedDelivery({
              name: "Todas",
            });
            setSelectedRating({
              name: "Todas",
            });
          }}>
          <ChangeBusiness
            className="icon"
            width="16px"
            height="16px"
            color="#ce2b43"
          />
          <p className="textDefault">
            {typeBusiness !== "LojaF" ? "Mudar > Loja F." : "Mudar > Ecom"}
          </p>
        </NavLink>
      </div>
    </nav>
  );
}
