import { THEME_STORAGE_KEY } from "@/lib/theme";

export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var light=t==="light";document.documentElement.classList.add(light?"light":"dark");document.documentElement.style.colorScheme=light?"light":"dark";}catch(e){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
