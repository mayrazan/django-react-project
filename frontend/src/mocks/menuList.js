import ViewListIcon from "@material-ui/icons/ViewList";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import ViewModuleOutlinedIcon from "@material-ui/icons/ViewModuleOutlined";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";

export const menuListInfo = [
  {
    id: 1,
    name: "Síndico",
    icon: <ViewListIcon />,
    link: "/sindico",
  },
  {
    id: 2,
    name: "Condôminos",
    icon: <ViewListIcon />,
    link: "/condominos",
  },
  {
    id: 3,
    name: "Usuários",
    icon: <PersonOutlineOutlinedIcon />,
    link: "/usuarios",
  },
  {
    id: 4,
    name: "Relatórios",
    icon: <AssignmentOutlinedIcon />,
    link: "/relatorios",
  },
  {
    id: 5,
    name: "Perfis de acesso",
    icon: <LockOutlinedIcon />,
    link: "/perfis-acesso",
  },
  {
    id: 6,
    name: "Indicadores",
    icon: <ViewModuleOutlinedIcon />,
    link: "/indicadores",
  },
  {
    id: 7,
    name: "Logs",
    icon: <LocalOfferOutlinedIcon />,
    link: "/logs",
  },
  {
    id: 8,
    name: "Banco de dados",
    icon: <StorageOutlinedIcon />,
    link: "/banco-dados",
  },
  {
    id: 9,
    name: "Backups",
    icon: <BackupOutlinedIcon />,
    link: "/backups",
  },
];
