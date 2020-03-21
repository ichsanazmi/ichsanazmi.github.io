<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Global_m extends CI_Model {
	
	public function __construct(){
	 	parent::__construct();
	 	// $this->load->model('global_m');
	 }

	function cek_login($table,$kondisi)
	{
	return $this->db->get_where($table,$kondisi);
	}

}

/* End of file global_m.php */
/* Location: ./application/models/global_m.php */
?>
