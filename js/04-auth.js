/* ============================================================ AUTH ============================================================ */
function handleLogin(e){
  e.preventDefault();
  const name = document.getElementById('loginName').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  const role = document.getElementById('loginRole').value;
  const err = document.getElementById('loginError');
  if(!name || !pass){
    err.classList.add('show');
    return false;
  }
  err.classList.remove('show');
  SESSION = { name, role };
  document.getElementById('topbarName').textContent = name;
  document.getElementById('topbarRole').textContent = role;
  document.getElementById('topbarAvatar').textContent = initials(name);
  document.getElementById('view-login').classList.remove('active');
  document.getElementById('view-app').classList.add('active');
  navigate('dashboard');
  return false;
}
function handleLogout(){
  document.getElementById('view-app').classList.remove('active');
  document.getElementById('view-login').classList.add('active');
  document.getElementById('loginPass').value = "";
}
