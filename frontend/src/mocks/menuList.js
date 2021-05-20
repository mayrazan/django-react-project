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
    link: "/admin/sindico",
  },
  {
    id: 2,
    name: "Condôminos",
    icon: <ViewListIcon />,
    link: "/admin/condominos",
  },
  {
    id: 3,
    name: "Usuários",
    icon: <PersonOutlineOutlinedIcon />,
    link: "/admin/usuarios",
  },
  {
    id: 4,
    name: "Relatórios",
    icon: <AssignmentOutlinedIcon />,
    link: "/admin/relatorios",
  },
  {
    id: 5,
    name: "Perfis de acesso",
    icon: <LockOutlinedIcon />,
    link: "/admin/perfis-acesso",
  },
  {
    id: 6,
    name: "Indicadores",
    icon: <ViewModuleOutlinedIcon />,
    link: "/admin/indicadores",
  },
  {
    id: 7,
    name: "Logs",
    icon: <LocalOfferOutlinedIcon />,
    link: "/admin/logs",
  },
  {
    id: 8,
    name: "Banco de dados",
    icon: <StorageOutlinedIcon />,
    link: "/admin/banco-dados",
  },
  {
    id: 9,
    name: "Backups",
    icon: <BackupOutlinedIcon />,
    link: "/admin/backups",
  },
  {
    id: 10,
    name: "Chamados",
    icon: <ViewListIcon />,
    link: "/admin/chamados",
  },
];

export const menuListInfoUser = [
  {
    id: 1,
    name: "Chamados",
    icon: <ViewListIcon />,
    link: "/chamados",
  },
];
