import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import CoffeeRoundedIcon from "@mui/icons-material/CoffeeRounded";
import LunchDiningRoundedIcon from "@mui/icons-material/LunchDiningRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import RamenDiningRoundedIcon from "@mui/icons-material/RamenDiningRounded";
import LocalPizzaRoundedIcon from "@mui/icons-material/LocalPizzaRounded";
import IcecreamRoundedIcon from "@mui/icons-material/IcecreamRounded";
import LocalDrinkRoundedIcon from "@mui/icons-material/LocalDrinkRounded";
import BakeryDiningRoundedIcon from "@mui/icons-material/BakeryDiningRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";

const RULES = [
    { keywords: ["tea", "chai"], icon: LocalCafeRoundedIcon },
    { keywords: ["coffee"], icon: CoffeeRoundedIcon },
    { keywords: ["sandwich", "toast", "bun"], icon: LunchDiningRoundedIcon },
    { keywords: ["snack", "chaat", "bite"], icon: FastfoodRoundedIcon },
    { keywords: ["maggi", "ramen", "noodle", "pasta"], icon: RamenDiningRoundedIcon },
    { keywords: ["pizza"], icon: LocalPizzaRoundedIcon },
    { keywords: ["dessert", "sweet", "ice cream", "kulfi"], icon: IcecreamRoundedIcon },
    { keywords: ["beverage", "drink", "juice", "lassi", "shake"], icon: LocalDrinkRoundedIcon },
    { keywords: ["paratha", "bread", "bakery", "poori", "kachori"], icon: BakeryDiningRoundedIcon }
];

export function getCategoryIcon(categoryName = "") {

    const name = categoryName.toLowerCase();
    const match = RULES.find((rule) => rule.keywords.some((keyword) => name.includes(keyword)));

    return match?.icon || RestaurantMenuRoundedIcon;

}
