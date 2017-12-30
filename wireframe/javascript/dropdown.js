const revealServerOptionDropdown = (event) => {
  event.stopPropagation(); // prevent event from being picked up by body
	$('.server-explorer-head-indicator').addClass('open');
	$('.server-explorer-head-indicator').attr('src','./assets/close.svg');
  $('.server-options-popup').addClass('open');
  $('.server-explorer-head').addClass('open');
  $('.server-explorer-head').off('click', revealServerOptionDropdown);
  $(document).on('click', hideServerOptionDropdown);
};

const hideServerOptionDropdown = () => {
	$('.server-explorer-head-indicator').removeClass('open');
  $('.server-explorer-head-indicator').attr('src','./assets/arrow-down.svg');
  $('.server-options-popup').removeClass('open');
  $('.server-explorer-head').removeClass('open');
  $('.server-explorer-head').on('click', revealServerOptionDropdown);
  $(document).off('click', hideServerOptionDropdown);
};

$(() => $('.server-explorer-head').on('click', revealServerOptionDropdown));
