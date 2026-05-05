return fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt })
  }).then(function(r){
    if (!r.ok) throw new Error('Kon geen stations ophalen. Probeer opnieuw.');
    return r.json();
  }).then(function(data){
    var raw = data.content.map(function(b){ return b.text || ''; }).join('');
    var clean = raw.replace(/```json|```/g, '').trim();
    var stations;
    try { stations = JSON.parse(clean); } catch(e) { throw new Error('Resultaten konden niet worden verwerkt.'); }
    showLoading(false);
    render(stations, verbruik, tankSize);
  });
