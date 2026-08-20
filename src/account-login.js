(() => {
  const RED = '#ef1726';
  const overlayId = 'nexora-account-overlay';

  const css = `
#${overlayId}{position:fixed;inset:0;z-index:1000;background:rgba(11,11,12,.48);display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:16px}
.nx-auth{width:min(430px,100%);min-height:calc(100dvh - 32px);margin:auto;background:#fff;border-radius:24px;box-shadow:0 24px 80px rgba(0,0,0,.22);padding:28px 20px;position:relative;color:#171719}
.nx-close{position:absolute;right:14px;top:14px;width:40px;height:40px;border:0;border-radius:50%;background:#f6f6f7;font-size:22px}
.nx-logo{display:flex;align-items:center;gap:10px;justify-content:center;font-weight:900;letter-spacing:.04em;margin:22px 0 36px}.nx-logo-mark{width:42px;height:42px;border-radius:12px;background:${RED};color:#fff;display:grid;place-items:center;font-size:21px}.nx-logo em{color:${RED};font-style:normal}
.nx-auth h1{font-size:30px;line-height:1.12;margin:0 0 8px}.nx-sub{color:#737378;margin:0 0 28px;line-height:1.5}.nx-field{display:flex;align-items:center;border:1px solid #e8e8eb;border-radius:14px;min-height:56px;padding:0 14px;background:#fff;box-shadow:0 3px 12px rgba(11,11,12,.04)}.nx-prefix{font-weight:700;margin-right:10px;padding-right:10px;border-right:1px solid #e8e8eb}.nx-field input{border:0;outline:0;width:100%;font-size:17px}.nx-primary{width:100%;min-height:56px;border:0;border-radius:14px;background:${RED};color:#fff;font-weight:800;margin-top:14px;font-size:16px;box-shadow:0 10px 22px rgba(239,23,38,.18)}.nx-guest{width:100%;border:0;background:none;margin-top:16px;padding:12px;color:#555;font-weight:700}.nx-security{text-align:center;color:#8a8a8f;font-size:12px;margin:20px 0}.nx-otp{display:flex;gap:8px;margin:22px 0}.nx-otp input{width:calc((100% - 40px)/6);height:54px;border:1px solid #e8e8eb;border-radius:12px;text-align:center;font-size:22px;font-weight:800;outline:none}.nx-otp input:focus{border-color:${RED};box-shadow:0 0 0 3px rgba(239,23,38,.09)}.nx-resend{text-align:center;color:#737378;font-size:14px}.nx-link{border:0;background:none;color:${RED};font-weight:800;padding:4px}.nx-account{width:min(700px,100%);min-height:calc(100dvh - 32px);margin:auto;background:#fff;border-radius:24px;padding:24px 16px;color:#171719}.nx-account-head{display:flex;align-items:center;justify-content:space-between;margin:28px 0 22px}.nx-account h1{font-size:27px;margin:0}.nx-profile{border:1px solid #eee;border-radius:18px;padding:16px;background:#fafafa}.nx-profile-row{display:flex;gap:12px;align-items:center;padding:9px 0}.nx-profile-icon{width:36px;height:36px;border-radius:10px;background:#fff;display:grid;place-items:center}.nx-menu{display:grid;gap:10px;margin-top:16px}.nx-menu button{min-height:54px;border:1px solid #eee;background:#fff;border-radius:14px;display:flex;align-items:center;gap:12px;padding:0 15px;text-align:left;font-weight:700}.nx-menu button span:last-child{margin-left:auto;color:#aaa}.nx-orders{margin-top:24px}.nx-order{border:1px solid #eee;border-radius:16px;padding:14px;margin-top:10px}.nx-order-top,.nx-order-bottom{display:flex;justify-content:space-between;gap:12px}.nx-status{font-size:12px;font-weight:800;color:#16a34a;background:#eaf8ef;padding:5px 8px;border-radius:999px}.nx-order small{color:#777}.nx-empty{text-align:center;padding:26px 10px;color:#777;background:#fafafa;border-radius:16px;margin-top:10px}
@media(min-width:700px){#${overlayId}{padding:30px}.nx-auth,.nx-account{min-height:auto}.nx-account{padding:28px}}
`;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const getProfile = () => { try { return JSON.parse(localStorage.getItem('nexora-customer') || 'null'); } catch { return null; } };
  const saveProfile = p => localStorage.setItem('nexora-customer', JSON.stringify(p));
  const lastOrder = () => { try { return JSON.parse(localStorage.getItem('nexora-last-order') || 'null'); } catch { return null; } };

  function mount(html, onReady) {
    document.getElementById(overlayId)?.remove();
    const o=document.createElement('div'); o.id=overlayId; o.innerHTML=html; document.body.appendChild(o);
    o.querySelector('.nx-close')?.addEventListener('click',()=>o.remove());
    onReady?.(o);
  }
  function login(){
    mount(`<section class="nx-auth" role="dialog" aria-modal="true"><button class="nx-close" aria-label="Close">×</button><div class="nx-logo"><span class="nx-logo-mark">N</span><span>NEXORA <em>MINUTES</em></span></div><h1>Welcome back 👋</h1><p class="nx-sub">Fast groceries, delivered to your doorstep.</p><div class="nx-field"><span class="nx-prefix">🇧🇩 +880</span><input id="nx-phone" inputmode="numeric" maxlength="10" placeholder="1XXXXXXXXX" aria-label="Mobile number"></div><button class="nx-primary" id="nx-send">Continue with OTP →</button><button class="nx-guest" id="nx-guest">Continue as Guest</button><p class="nx-security">🔒 Your number is safe with us.</p></section>`, o=>{
      o.querySelector('#nx-send').onclick=()=>{const phone=o.querySelector('#nx-phone').value.replace(/\D/g,'');if(phone.length!==10){o.querySelector('#nx-phone').focus();return;} otp(phone);};
      o.querySelector('#nx-guest').onclick=()=>{saveProfile({name:'Guest',phone:'',address:''});account();};
    });
  }
  function otp(phone){
    mount(`<section class="nx-auth" role="dialog" aria-modal="true"><button class="nx-close">×</button><div class="nx-logo"><span class="nx-logo-mark">N</span><span>NEXORA <em>MINUTES</em></span></div><h1>Verify your number</h1><p class="nx-sub">Enter the 6-digit OTP sent to <b>+880 ${esc(phone)}</b>.</p><div class="nx-otp">${[0,1,2,3,4,5].map(i=>`<input maxlength="1" inputmode="numeric" aria-label="OTP digit ${i+1}">`).join('')}</div><p class="nx-resend">Resend OTP in <b id="nx-timer">30s</b></p><button class="nx-link" id="nx-change">Change mobile number</button><button class="nx-primary" id="nx-verify">Verify & Continue →</button><p class="nx-security">🔒 Your number is safe with us.</p></section>`, o=>{
      const inputs=[...o.querySelectorAll('.nx-otp input')];inputs.forEach((x,i)=>x.oninput=()=>{x.value=x.value.replace(/\D/g,'').slice(0,1);if(x.value&&inputs[i+1])inputs[i+1].focus();});
      let t=30;const timer=o.querySelector('#nx-timer');const iv=setInterval(()=>{t--;if(timer)timer.textContent=`${t}s`;if(t<=0){clearInterval(iv);if(timer)timer.textContent='Resend OTP';}},1000);
      o.querySelector('#nx-change').onclick=()=>{clearInterval(iv);login();};
      o.querySelector('#nx-verify').onclick=()=>{clearInterval(iv);saveProfile({name:'Customer',phone:'+880 '+phone,address:'Add your delivery address'});account();};
    });
  }
  function account(){
    const p=getProfile()||{name:'Customer',phone:'',address:''}, o=lastOrder();
    mount(`<section class="nx-account"><button class="nx-close">×</button><div class="nx-account-head"><h1>Hello, ${esc(p.name)} 👋</h1></div><div class="nx-profile"><div class="nx-profile-row"><span class="nx-profile-icon">📱</span><div><small>Mobile Number</small><b>${esc(p.phone||'Guest')}</b></div></div><div class="nx-profile-row"><span class="nx-profile-icon">📍</span><div><small>Delivery Address</small><b>${esc(p.address||'Not added')}</b></div></div><button class="nx-link" id="nx-edit">✏️ Edit Profile</button></div><div class="nx-menu">${[['📦','My Orders'],['🔄','Order Again'],['❤️','Wishlist'],['📍','Saved Addresses'],['💳','Payment Methods'],['🎁','Offers & Rewards'],['⚙️','Settings']].map(([i,t])=>`<button>${i}<span>${t}</span><span>›</span></button>`).join('')}<button id="nx-logout">🚪<span>Logout</span><span>›</span></button></div><div class="nx-orders"><h2>My Orders</h2>${o?`<div class="nx-order"><div class="nx-order-top"><b>${esc(o.id)}</b><span class="nx-status">Confirmed</span></div><small>${new Date(o.createdAt||Date.now()).toLocaleDateString()} · ৳${esc(o.total)}</small><div class="nx-order-bottom"><span>Cash on Delivery</span><button class="nx-link">View Details</button></div></div>`:`<div class="nx-empty">No recent orders yet.</div>`}</div></section>`, el=>{
      el.querySelector('#nx-logout').onclick=()=>{localStorage.removeItem('nexora-customer');el.remove();};
      el.querySelector('#nx-edit').onclick=()=>{const name=prompt('Customer name',p.name||'');if(name!==null){saveProfile({...p,name:name.trim()||'Customer'});account();}};
    });
  }
  function openAccount(){getProfile()?account():login();}
  document.addEventListener('click',e=>{const accountButton=e.target.closest('.account-btn,.bottom-nav a[href="#account"]');if(accountButton){e.preventDefault();openAccount();}});
})();
