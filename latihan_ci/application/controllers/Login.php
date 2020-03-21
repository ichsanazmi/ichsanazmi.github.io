<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	 
	public function index()
	{
		$this->load->view('login');
	} //index()
	public function cek_login(){
		$this->load->model('global_m');
		$userid = $this->input->post('username');
		$pass = $this->input->post('password');
		$where = array(
			'username' => $userid,
			'password' => md5($pass)
			);
		$key = "!@#$%^&*";
		$password = $key."".$pass."".$key;
		#echo md5($password);
		$datauser=$this->global_m->cek_login('login',$where);
		foreach ($datauser->result() as $dt){
			$nama=$dt->nama;
			$email=$dt->email;
		} //foreach datauser
		if($datauser->num_rows()>0){
			#echo $this->db->last_query();
			#echo "nama anda adalah :".$nama."<br>";
			#echo "email anda adalah :".$email;
		$data_session = array(
			'nama' => $nama,
			'email' => $email,
			'username'=> $userid
			);
		$this->session->set_userdata($data_session);
		redirect(base_url('menuutama'));
		}else{
		?>
		 <script type="text/javascript">
			//echo "maaf password atau username anda salah";
			alert("maaf");
			window.open("<?php echo base_url()."login" ?>","_self");
			</script>
		<?php
		} //if numrows
	} //cek_login
}// class login
?> 
