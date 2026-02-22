let links = document.querySelectorAll('.has-tooltip');
let tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
let tooltipPosition = 'bottom';
let currentLink;

function getPositionTooltip(currentLink) {
    switch (tooltipPosition) {
        case 'top':
            tooltip.style.top = currentLink.offsetTop - tooltip.offsetHeight - document.documentElement.scrollTop + 'px';
            tooltip.style.left = currentLink.offsetLeft + "px";
            break;
        case 'left':
            tooltip.style.top = currentLink.offsetTop - document.documentElement.scrollTop + 'px';
            tooltip.style.left = (currentLink.offsetLeft - tooltip.offsetWidth) < 0 ? '0px' : currentLink.offsetLeft - tooltip.offsetWidth + 'px';
            break;
        case 'right':
            tooltip.style.top = currentLink.offsetTop - document.documentElement.scrollTop + 'px';
            tooltip.style.left = currentLink.offsetLeft + currentLink.offsetWidth + 'px';
            break;
        case 'bottom':
            tooltip.style.top = currentLink.offsetTop + currentLink.offsetHeight - document.documentElement.scrollTop + 'px';
            tooltip.style.left = currentLink.offsetLeft + "px";
            break;
    }
}

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        tooltip.innerText = link.getAttribute('title');

        if (currentLink === link) {
            tooltip.classList.toggle('tooltip_active');
        } else {
            tooltip.classList.add('tooltip_active');
        }

        tooltip.setAttribute('data-position', tooltipPosition);
        link.after(tooltip);

        getPositionTooltip(link);
        currentLink = link;
    });
})

document.addEventListener('scroll', () => {
    if (currentLink) {
        getPositionTooltip(currentLink)
    }
});