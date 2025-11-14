// composables/useMobileMenu.js
export const useMobileMenu = () => {
  const mobileMenuOpen = useState('mobileMenuOpen', () => false);
  
  const openMobileMenu = () => {
    mobileMenuOpen.value = true;
  };
  
  const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
  };
  
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  };
  
  return {
    mobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu    
  };
};