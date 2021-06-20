import ViewListIcon from "@material-ui/icons/ViewList";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";

export const menuListInfo = [
  {
    id: 1,
    name: "Síndicos",
    icon: <PeopleAltOutlinedIcon />,
    link: "/admin/sindicos",
  },
  {
    id: 2,
    name: "Condôminos",
    icon: <PeopleAltOutlinedIcon />,
    link: "/admin/condominos",
  },
  {
    id: 3,
    name: "Chamados",
    icon: <LabelOutlinedIcon />,
    link: "/admin/chamados",
  },
  {
    id: 4,
    name: "Avisos",
    icon: <SendOutlinedIcon />,
    link: "/admin/avisos",
  },
  {
    id: 5,
    name: "Cadastro de Perturbações",
    icon: <ViewListIcon />,
    link: "/admin/cadastro-perturbacao",
  },
  {
    id: 6,
    name: "Tags Coloridas",
    icon: <LocalOfferOutlinedIcon />,
    link: "/admin/tags",
  },
  {
    id: 7,
    name: "Histórico Atualizações",
    icon: <HistoryOutlinedIcon />,
    link: "/admin/historico",
  },
];

export const menuListInfoUser = [
  {
    id: 1,
    name: "Chamados",
    icon: <LabelOutlinedIcon />,
    link: "/chamados",
  },
];
