// Variáveis criadas a partir de TAGS HTML

var tagsOpcTmp = document.querySelectorAll("input[name='opcTmp']"); // Seleciona entre o modo "alarme" e o modo "timer";
var tagTxtAlarme = document.querySelector("#tagTxtAlarme"); // Texto contido dentro da tag #tagTxtAlarme
var tagTxtTimer = document.querySelector("#tagTxtTimer"); // Texto contido dentro da tag #tagTxtTimer
var tagTxtCaixaOpc = document.querySelector("#tagTxtCaixaOpc"); // Texto contido dentro da tag #tagTxtTimer
var tagsAcaoAlarme = document.querySelectorAll("input[name='acaoAlarme']"); // Seleciona entre os modos "reproduzir som" e "modo abrir janela";
var tagTxtSom = document.querySelector("#tagTxtSom"); // Texto contido dentro da tag #tagTxtSom
var tagTxtJanela = document.querySelector("#tagTxtJanela"); // Texto contido dentro da tag #tagTxtJanela
var tagsTxtTempo = document.querySelectorAll("#dvTagsTempo legend"); // Texto contido dentro das tags legend
var tagTmpHor = document.querySelector("#tagTmpHor"); // Armazena o total de horas;
var tagTmpMin = document.querySelector("#tagTmpMin"); // Armazena o total de minutos;
var tagTmpSeg = document.querySelector("#tagTmpSeg"); // Armazena o total de segundos;
var tagTmpAtual = document.querySelector("#tagTmpAtual"); // Armazena o tempo atual do cronômetro;
var tagBtIniciaCrono = document.querySelector("#tagBtIniciaCrono"); // Botão que inicia o cronômetro;
var tagBtParaCrono = document.querySelector("#tagBtParaCrono"); // Botão que para o cronômetro;
var tagBtCancelaCrono = document.querySelector("#tagBtCancelaCrono"); // Botão que cancela o cronômetro;  
var tagNovaUrl =  document.querySelector("#tagNovaUrl"); // armazena a url da nova janela;
var tagEstadoModoSoneca = document.querySelector("#tagEstadoModoSoneca"); // Tag que verifica se o modo soneca está selecionado ou não; 
var tagTxtModoSoneca = document.querySelector("#tagTxtModoSoneca");  // Texto contido dentro da tag #tagTxtModoSoneca;
var tagModoSoneca = document.querySelector("#tagModoSoneca"); // Tag que que guarda o valor em minutos do modo soneca; 
var tagAlarmeAudio = document.querySelector("#tagAlarmeAudio"); // Armazena o arquivo de som que será tocado quando o cronômetro chegar ao fim;
var tagCaixaAlarme = document.querySelector("#tagCaixaAlarme"); // Tag onde os players do alarme estarão contidos; 
var tagBtfinalizaAlarme =  document.querySelector("#tagBtfinalizaAlarme"); // Recebe o evento que pausa o alarme e fecha a caixa;
var tagBtIniciaModoSoneca =  document.querySelector("#tagBtIniciaModoSoneca"); // Inicia o modo soneca 

// ========================================================================

// Variáveis Auxiliares

var alarmModeSel;
var valAcaoSel;
var cronometro;
var tmpCrono = 0;
var estadoTagsTempo;
var horarioLimite;
var txtBtInicia = ["Iniciar","Continuar"]; 
var msgCancela = "A operação foi cancelada."; 
var msgAAtturl = "Url Atualizada!";
var horarioAtual;
var horarioFimChrono;
var segundosRestantes = 0;

// ==================================================================

 window.addEventListener("load",inicio);  

// Função Padrão de Início de código;

function inicio(){




tagsOpcTmp[0].addEventListener("input",selecionaOpcCrono);
tagsOpcTmp[1].addEventListener("input",selecionaOpcCrono);

tagsAcaoAlarme[0].addEventListener("input",seleCionaAcaoCrono);
tagsAcaoAlarme[1].addEventListener("input",seleCionaAcaoCrono);



tagTmpHor.addEventListener("input",checaTagsTempo);
tagTmpMin.addEventListener("input",checaTagsTempo);
tagTmpSeg.addEventListener("input",checaTagsTempo);

tagBtIniciaCrono.addEventListener("click",function(){

    switchBtsCrono(this,tagBtParaCrono);
    switchEstadoBts(tagBtParaCrono,alarmModeSel);
    switchEstadoBts(tagBtCancelaCrono,false);

    desabilitaElementos();
    iniciaCrono();
 

});


tagBtParaCrono.addEventListener("click",function(){

tagBtIniciaCrono.innerHTML = txtBtInicia[1];

switchBtsCrono(this,tagBtIniciaCrono);
   
paraCrono();
     
});

tagBtCancelaCrono.addEventListener("click",function(){
   

   window.clearInterval(cronometro);
    alert(msgCancela);
    switchBtsCrono(tagBtParaCrono,tagBtIniciaCrono);
    finalizaCrono();
 
 });



tagNovaUrl.addEventListener("change",checaValidadeUrl); 
tagEstadoModoSoneca.addEventListener("change",motorEstadoModoSoneca);
tagModoSoneca.addEventListener("change",motorChecaValorModoSoneca);


tagBtfinalizaAlarme.addEventListener("click",motorFinalizaAlarme);
tagBtIniciaModoSoneca.addEventListener("click",motorModoSoneca);



chegaDadosSalvos();





checaIdiomaNavegador();
verificaEstadoModoSoneca();
selecionaOpcCrono();
seleCionaAcaoCrono();
switchEstadoBts(tagBtCancelaCrono,true);

}

// ====================================================================

// Função que checa se já existem preferencias do usuário salvas no local storage e as carrega

function chegaDadosSalvos(){

var opcModo = (localStorage.getItem("opcModo") == null) ? 0 : parseInt(localStorage.getItem("opcModo"));
var opcAcao = (localStorage.getItem("opcAcao") == null) ? 0 : parseInt(localStorage.getItem("opcAcao"));
var hor = (localStorage.getItem("hor") == null) ? 0 : localStorage.getItem("hor");
var min = (localStorage.getItem("min") == null) ? 0 : localStorage.getItem("min");
var seg = (localStorage.getItem("seg") == null) ? 0 : localStorage.getItem("seg");
var url = (localStorage.getItem("url") == null) ? "https://google.com" : localStorage.getItem("url");
var opcModoSoneca = (localStorage.getItem("estadoOpcModoSoneca") == null) ? "false" : localStorage.getItem("estadoOpcModoSoneca"); 
var valModoSoneca = (localStorage.getItem("valModoSoneca") == null) ? "5" : localStorage.getItem("valModoSoneca"); 



opcModoSoneca = (opcModoSoneca == "true")? true : false; 


tagsOpcTmp[opcModo].checked = true;
tagsAcaoAlarme[opcAcao].checked = true;
tagNovaUrl.value = url;

tagTmpHor.value = hor;
tagTmpMin.value = min;
tagTmpSeg.value = seg;
tagEstadoModoSoneca.checked = opcModoSoneca;
tagModoSoneca.value = valModoSoneca;


}

// ==============================================================================================




// Função que checa o idioma do navegador e muda o idioma de alguns elementos da página conforme o resultado 

function checaIdiomaNavegador(){

if(navigator.language != "pt-BR" && navigator.language != "pt-PT"){


tagTxtAlarme.innerHTML = "Alarm Clock";
tagTxtTimer.innerHTML  = "Timer"; 
tagTxtCaixaOpc.innerHTML = "Options"; 

tagTxtSom.innerHTML = "Play a tune";
tagTxtJanela.innerHTML = "Open a window";

tagsTxtTempo[0].innerHTML = "Hours";
tagsTxtTempo[1].innerHTML = "Minutes";
tagsTxtTempo[2].innerHTML = "Seconds";

txtBtInicia = ["Start","Resume"];

tagBtParaCrono.innerHTML = "Pause";
tagBtCancelaCrono.innerHTML = "Cancel";

tagTxtModoSoneca.innerHTML = "Snooze Mode"; 


tagBtfinalizaAlarme.innerHTML   = "Stop";  
tagBtIniciaModoSoneca.innerHTML = "Snooze Mode"; 


msgAAtturl = "The Url has been updated!";
msgCancela = "The operation has been canceled.";

}

tagBtIniciaCrono.innerHTML = txtBtInicia[0];

}


// =============================================================================================================



// Função que verifica qual "modo" do cronômetro está selecionado. Alarme ou timer;

function selecionaOpcCrono(){

if(this.value)
    atualizaPreferenciaUser("opcModo",this.value);


alarmModeSel = (tagsOpcTmp[0].checked) ? true : false;
        
if(alarmModeSel)
    tagTmpHor.max = 23;
else
    tagTmpHor.max = 99;
            
     
    checaEstadoTagsRadio(tagsOpcTmp);
    checaTagsTempo();
    
}


// ====================================================================================



// Função que verifica qual "ação" deve ser realizada quando o cronômetro for zerado. Tocar um som ou abrir uma janela;

function seleCionaAcaoCrono(){


if(this.value){
    atualizaPreferenciaUser("opcAcao",this.value);

valAcaoSel = this.value;


}else
valAcaoSel = checaTagSel(tagsAcaoAlarme);





checaEstadoTagsRadio(tagsAcaoAlarme);

}

// ====================================================================================

// Função que verifica qual TAG está selecionada


function checaTagSel(tag){

var valTagSel;

for(var x = 0; x < tag.length; x++){

if(tag[x].checked){
    valTagSel = tag[x].value; 
    break;
    }

}    

return valTagSel;

}

// =====================================================================================


// Função que salva no local Storage as preferencias do usuário  

function atualizaPreferenciaUser(chave,valor){

localStorage.setItem(chave,valor);

}

// =======================================================================================




// Função que checa se a url digitada é válida

function checaValidadeUrl(){


if(tagNovaUrl.checkValidity())
    attUrl();




}

// ======================================================================================



// Função que atualiza a url da nova janela 

function attUrl(){

urlNovaJanela = tagNovaUrl.value;

atualizaPreferenciaUser("url",urlNovaJanela);


alert(msgAAtturl);

}

// ========================================================================================



// Função que checa se as TAGS radio estão selecionadas ou não e as formata de acordo com o resultado   


function checaEstadoTagsRadio(tag){

    for(var x = 0; x < tag.length; x++){
    
  
        
    
    if(tag[x].checked){
       
    tag[x].parentElement.classList.add("eleSelecionado");
    if(tag[x].parentElement.getAttribute("class","eleNaoSelecionado"))
        tag[x].parentElement.classList.remove("eleNaoSelecionado");
    
    
    
    }else{
    
    
    tag[x].parentElement.classList.add("eleNaoSelecionado");
    if(tag[x].parentElement.getAttribute("class","eleSelecionado"))
        tag[x].parentElement.classList.remove("eleSelecionado");
    
    
    }

    }
    
    }


// =======================================================================================================



// Função que zera o valor da tag passada como parâmetro


function zeraTagsTempo(tag){

tag.value = 0;

}

// ====================================================


// Funçao que desabilita ou habilita a tag passada como parâmetro 

function switchTagsTempo(tag,chave){

tag.disabled = chave;
        
}

// ==============================================================


// Função que valida os valores contidos nas TAGS de tempo 

function checaTagsTempo(){


var tagsTempo = [tagTmpHor,tagTmpMin,tagTmpSeg];
 

for(var x = 0; x < tagsTempo.length; x++){

    estadoTagsTempo = (tagsTempo[x].checkValidity());

    
    if(!(estadoTagsTempo))
        break;

}


if(estadoTagsTempo){

atualizaPreferenciaUser("hor",tagsTempo[0].value);
atualizaPreferenciaUser("min",tagsTempo[1].value);
atualizaPreferenciaUser("seg",tagsTempo[2].value);


if(!(alarmModeSel))
    addTmpCrono();

}

checaTmpeModo();






}

// =============================================================================


// Função que adiciona os valores contidos nas tags de tempo à variável tmpCrono; 

function addTmpCrono(){

tmpCrono =  parseInt((tagTmpHor.value * 3600)) + parseInt((tagTmpMin.value * 60)) + parseInt((tagTmpSeg.value));

}


// ===========================================================================



// Função que checa o valor de tmpCrono e qual modo do alarme está selecionado

function checaTmpeModo(){


switchEstadoBts(tagBtIniciaCrono,(
                                  !(
                                    ((tmpCrono > 0) || (alarmModeSel)) && (estadoTagsTempo)
                                   )
                                 )
               );


}

// ==========================================================================




// Função que inverte a visibilidade dos botões passados como parâmetro

function switchBtsCrono(tag1,tag2){

var classesBt = tag1.getAttribute("class") + " " + "ghost";

tag1.setAttribute("class",classesBt);

if(tag2.hasAttribute("class","ghost"))
tag2.classList.remove("ghost");

}

// ======================================================================


// Função que para o cronômetro

 function paraCrono(){

     window.clearInterval(cronometro);
  

    
}

// ===================================


// Função que desabilita elementos

function desabilitaElementos(){


    switchEstadoBts(tagsOpcTmp[0],true);
    switchEstadoBts(tagsOpcTmp[1],true);
    
        
    switchEstadoBts(tagsAcaoAlarme[0],true);
    switchEstadoBts(tagsAcaoAlarme[1],true);
  
      
    switchTagsTempo(tagTmpHor,true);
    switchTagsTempo(tagTmpMin,true);
    switchTagsTempo(tagTmpSeg,true);
  


    switchEstadoBts(tagNovaUrl,true);
    switchEstadoBts(tagEstadoModoSoneca,true);
    switchEstadoBts(tagModoSoneca,true);
    

   
 
    if(alarmModeSel)
        switchEstadoBts(tagBtParaCrono,true);
        

        
}

// =======================================================================


// Função que cria o intervalo do cronômetro

function iniciaCrono(){
    
    horarioAtual = new Date(); 
    horarioFimChrono = new Date();

    if(!(alarmModeSel)){
        
    if(segundosRestantes)
        horarioFimChrono.setSeconds((horarioFimChrono.getSeconds() + segundosRestantes));
    else
        horarioFimChrono.setSeconds((horarioFimChrono.getSeconds() + tmpCrono));

    }else{

        horarioFimChrono.setHours(tagTmpHor.value);
        horarioFimChrono.setMinutes(tagTmpMin.value);
        horarioFimChrono.setSeconds(tagTmpSeg.value); 

        if(horarioFimChrono < horarioAtual){

            horarioFimChrono.setDate( horarioFimChrono.getDate() + 1);
          }

         
    
}
   cronometro = window.setInterval(attCrono,1000);
    
}

// =========================================================


// Função que atualiza o cronômetro 

function attCrono(){

horarioAtual = new Date();
segundosRestantes = Math.ceil((horarioFimChrono - horarioAtual) / 1000); 


var horas = ((segundosRestantes - (segundosRestantes % 3600)) / 3600);
var minutos = ((segundosRestantes - (segundosRestantes % 60)) / 60) - (horas * 60);
var segundos = (segundosRestantes % 60).toFixed(0);

tagTmpAtual.innerHTML = addZero(horas) + ":" + addZero(minutos) + ":" + addZero(segundos);  

if(!(segundosRestantes)){

           
        window.clearInterval(cronometro);
      
       
        switchEstadoBts(tagBtIniciaCrono,true);
        switchEstadoBts(tagBtParaCrono,true);
        switchEstadoBts(tagBtCancelaCrono,true);    

        
        motorIniciaAlarme(); 
    

}


}

// ========================================================

function motorEstadoModoSoneca(){

    atualizaPreferenciaUser("estadoOpcModoSoneca",tagEstadoModoSoneca.checked);

    verificaEstadoModoSoneca();


}

// ====================================================================

function motorChecaValorModoSoneca(){

    if(tagModoSoneca.checkValidity()){
        atualizaPreferenciaUser("valModoSoneca",tagModoSoneca.value);
        removeClasse(tagBtIniciaModoSoneca,"ghost");

    }else
      addClasse(tagBtIniciaModoSoneca,"ghost"); 
    


}

// ===================================================================


// Função que verifica o estado da TAG tagEstadoModoSoneca  

function verificaEstadoModoSoneca(){



if(tagEstadoModoSoneca.checked)
    removeClasse(tagBtIniciaModoSoneca,"ghost");
else    
    addClasse(tagBtIniciaModoSoneca,"ghost");    


    switchEstadoBts(tagModoSoneca,!(tagEstadoModoSoneca.checked));


}

// ========================================================




// Função que adiciona uma classe a um elemento

function addClasse(ele,classe){

ele.classList.add(classe);

}

// =========================================================





// Função que adiciona um zero aos valores menores que dez 

function addZero(val){

if(val < 10)
val = "0" + val;

return val;

}

// ==============================================================


// Função que reproduz o som do alarme

function tocaAlarme(){


tagAlarmeAudio.play();


}

// ================================================

// Função que pausa o alarme reativa uns elementos e desativa outros

function motorFinalizaAlarme(){


if(valAcaoSel == "0"){

tagAlarmeAudio.pause();
tagAlarmeAudio.currentTime = 0;    
    
}
    





tagCaixaAlarme.removeAttribute("open");

finalizaCrono();
switchBtsCrono(tagBtParaCrono,tagBtIniciaCrono);
switchEstadoBts(tagBtIniciaCrono,false);
switchEstadoBts(tagBtParaCrono,false);


}

// ===============================================================

// Função que grencia o modo Soneca 

function motorModoSoneca(){

var totalMinutos;    

if(tagModoSoneca.checkValidity())
    totalMinutos = parseInt(tagModoSoneca.value) * 60;
else
    totalMinutos = 0;



tmpCrono = totalMinutos;
alarmModeSel = false;


tagAlarmeAudio.pause();
tagAlarmeAudio.currentTime = 0;
tagCaixaAlarme.removeAttribute("open");




switchEstadoBts(tagBtIniciaCrono,false);
switchEstadoBts(tagBtParaCrono,false);
switchEstadoBts(tagBtCancelaCrono,false);    
iniciaCrono();


}

// ====================================================






// Função que finaliza o cronômetro

function finalizaCrono(){

segundosRestantes = 0;    

switchTagsTempo(tagTmpHor,false);    
switchTagsTempo(tagTmpMin,false);
switchTagsTempo(tagTmpSeg,false);

switchEstadoBts(tagsOpcTmp[0],false);
switchEstadoBts(tagsOpcTmp[1],false);

switchEstadoBts(tagsAcaoAlarme[0],false);
switchEstadoBts(tagsAcaoAlarme[1],false);

switchEstadoBts(tagNovaUrl,false);
switchEstadoBts(tagEstadoModoSoneca,false);
verificaEstadoModoSoneca();

switchEstadoBts(tagBtCancelaCrono,true);  


tagBtIniciaCrono.innerHTML = txtBtInicia[0];

tagTmpAtual.innerHTML = "00:00:00"; 

selecionaOpcCrono();
checaEstadoTagsRadio(tagsAcaoAlarme);

if(!(alarmModeSel))
    addTmpCrono();




}


// =====================================================================


function switchEstadoBts(bt,chave){

bt.disabled = chave;

}


// Função que serve de motor para a execução do vídeo

function motorIniciaAlarme(){

 mudaAtributo(tagCaixaAlarme,"open",true);

 switch(valAcaoSel){

    case "0":
        tocaAlarme();
    break;

    case "1":
        abreJanela();
    break;


}
   

} 


// =================================

// Função que remove uma classe presente em um elemento

function removeClasse(ele,classe){

    if(ele.classList.contains(classe))
        ele.classList.remove(classe);


}

// ====================================================


// Função que remove uma classe presente em um elemento

function addClasse(ele,classe){

    ele.classList.add(classe);
    
    
    }
    
    // ====================================================






// Função que muda determinado atributo de um elemento 


function mudaAtributo(ele,atr,val){

ele.setAttribute(atr,val);


}

// =====================================================




// Função que abre uma nova janela


function abreJanela(){

window.open(tagNovaUrl.value,"_blank","width=900,height=500");    


}

// ============================================================================

