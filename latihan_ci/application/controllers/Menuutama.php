<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Menuutama extends CI_Controller {

	 function __construct(){
	 	parent::__construct();
	 	$this->load->model('global_m');
	 }
	public function index()
	{
		$this->load->view('menu');
	} //index()
}
?>
