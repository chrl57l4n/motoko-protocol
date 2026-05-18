// motoko-protocol — Design Variant Switcher
// Erlaubt Live-Switching zwischen den 4 Design-Varianten via Header-Dropdown.
// State persistent in localStorage damit Auswahl ueber Page-Loads ueberlebt.
(function() {
    const VARIANTS = ['a', 'b', 'c', 'd'];
    const KEY = 'motoko-blog-variant';

    function applyVariant(v) {
        if (!VARIANTS.includes(v)) v = 'd';
        document.documentElement.setAttribute('data-variant', v);
        VARIANTS.forEach(id => {
            const link = document.getElementById('css-variant-' + id);
            if (link) link.disabled = (id !== v);
        });
        const sel = document.getElementById('variant-select');
        if (sel && sel.value !== v) sel.value = v;
        try { localStorage.setItem(KEY, v); } catch(e) {}
    }

    // Init: aus localStorage oder default 'd'
    let initial = 'd';
    try { initial = localStorage.getItem(KEY) || 'd'; } catch(e) {}
    applyVariant(initial);

    // Bind select-change
    document.addEventListener('DOMContentLoaded', () => {
        const sel = document.getElementById('variant-select');
        if (sel) {
            sel.value = initial;
            sel.addEventListener('change', (e) => applyVariant(e.target.value));
        }
    });
})();
