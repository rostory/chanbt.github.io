const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
 {
question:'스냅샷 이미지를 이용해서 신규 생성한 볼륨을 현재 사용중인 서버에 Attach한 후 서버를 리부팅하였으나, 정상적으로 리부팅이 되지 않는다. 어떤 이슈를 의심할 수 있는가?',
choice1:' 해당 스냅샷 이미지는 sysprep작업이 적용되지 않는 이미지 일 것이다.',
choice2:' 스냅샷 이미지를 이용해 생성한 볼륨을 서버에 마운트 후 리부팅을 했었어야 한다.',
choice3:' 스냅샷 이미지를 이용해 생성한 볼륨이 다른 서버의 부팅 볼륨일 것이며, uuid중복으로 정상부팅되지 않는 것이다.',
choice4:' 스냅샷 이미지를 이용해서 신규 볼륨 생성 시 선택한 볼륨 타입이 현재 사용중인 서버에 Attach 할 수 없는 볼륨이다.',
answer: '3',
		},
		{
question:'동일한 Subnet에 생상한 서버와 Cloud DB for MySQL을 연동해야 한다. 서버에서 데이터베이스 서버로 TCP/3306 포트를 통해 접근해야 하지만 통신이 되고 있지 않다. 다음 중 정상 통신을 위해 해야하는 설정은?',
choice1:' Cloud DB for MySQL의 ACG에 접근소스를 서버IP로 하여 3306 포트 허용 정책을 추가한다.',
choice2:' 서버의 ACG에 접근 소스를 데이터베이스 도메인으로 하여 3306 포트 허용 정책을 추가한다.',
choice3:' 두 개체가 포함된 Subnet에 매핑된 NACL에 접근 소스를 Subnet대역으로 하여 3306포트 혀용 정책을 추가한다.',
choice4:' 데이터베이스 서버에 접속하여 서버 방화벽을 해제한다.',
answer: '1',
		},
		{
question:'그림과 같이 PS명령어 실행 시 STAT 필드에 대한 설명 중 잘못된 것은?',
choice1:' R : running or runnable',
choice2:' Z : defunct(“zomble”) process',
choice3:' W : paging',
choice4:' S : Stopped, either by a job control signal or because it is being traced',
answer: '4',
		},
		{
question:'리눅스에서 현재 메모리 사용량을 확인할 수 있는 명령어가 아닌 것은?',
choice1:' top',
choice2:' meminfo',
choice3:' sar',
choice4:' free',
answer: '2',
		},
		{
question:'SAR로 물리적 디스크에서 발생한 I/O를 확인하고자 한다. 이 때 사용할 수 있는 옵션은 무엇인가?',
choice1:' sar –a',
choice2:' sar –b',
choice3:' sar –c',
choice4:' sar –f',
answer: '2',
		},
		{
question:'여러명의 사람들이 공통의 네이버 클라우드 플랫폼 인프라 환경을 이용하고 있다. 누군가 실수로 운영중인 서버를 반납하였다. 다음과 같은 사태를 막고자 할 때 사용할 수 있는 방법은?',
choice1:' 중요 서버들은 서버 관리 및 설정 환경에서 반납보호를 설정한다.',
choice2:' 실수한 사람을 문책한다',
choice3:' 서버 이르에 반납 금지를 표기한다.',
choice4:' Resource Manager에서 중요 서버를 설정한다.',
answer: '1',
		},
		{
question:'다수의 클라이언트에서 서버의 공인 IP로 접속하면 잘 보이지만 L7헬스체크가 적용된 LB로 접속하면 접속이 되지 않고 LB에서 보면 서버 연결상태가 실패로 나온다. 원인으로 추정할만한 것은 무엇인가? (503 Service Unavailable)',
choice1:' ACG',
choice2:' Index.html',
choice3:' DNS',
choice4:' virtualhost',
answer: '2',
		},
		{
question:'리눅스에서 “su root” 명령어와 “su –root”명령어의 차이점에 대해 올바른 설명은?',
choice1:' 차이없음',
choice2:' su -명령어는 root 계정의 환경변수를 그대로 가져오지만, su root는 기존 계정의 환경변수를 사용한다',
choice3:' su 명령어는 sudo로 실행 가능한 명령어만 실행 가능하다',
choice4:' su명령어로 계정을 변경하게 되면 exit 시 로그아웃하게 된다.',
answer: '2',
		},
		{
question:'windows환경하에서 다음의 ping 명령어의 옵션을 어떤의미인가? ping –n -5 –I 2 www.naver.com',
choice1:' 5byte를 2초마다 전송',
choice2:' 2초의 간격으로 5번 전송',
choice3:' TTL값을 2로하여 5번 전송',
choice4:' 5byte를 2번 전송',
answer: '3',
		},
		{
question:'프로세스가 오픈한 파일을 확인하는 명령어는?',
choice1:' ps',
choice2:' psof',
choice3:' top',
choice4:' isof',
answer: '4',
		},
		{
question:'Windows 클라이언트에서 DNS캐시된 정보를 삭제하고자 할 떄 사용하는 명령어는?',
choice1:' mdc flush',
choice2:' ndc flush ',
choice3:' ipconfig / flushdns ',
choice4:' netsh flushdns ',
answer: '3',
		},
		{
question:'네이버 클라우드 플랫폼 Classic 환경에 존재하는 서버의 10.x.x.x 사설 IP대역 NIC에 두 개 이상의 IP를 부여하였을 때 발생할 수 있는 상황은?',
choice1:' 기존 IP로는 통신이 되나 추가된 IP로 통신이 되지 않는다.',
choice2:' 추가된 IP뿐만 아니라 기존 IP도 통신이 되지 않는다.',
choice3:' 서버가 강제 정지된다.',
choice4:' 기존 IP는 통신이 안되고 추가된 IP로만 통신이 된다.',
answer: '2',
		},
		{
question:'Windows에서 라우팅 테이블을 확인 할 수 있느 명령어는 무엇인가?',
choice1:' route –arn',
choice2:' route',
choice3:' route print',
choice4:' netstat',
answer: '3',
		},
		{
question:'IPSEC VPN으로 연결된 Server A에서 Server T로 접속이 안되고 있다. VPN설정은 정상이라면 Server A의 어떤 설정이 문제일지 Server A의 라우팅 테이블을 보고 유추하시오.',
choice1:' Desstination 설정이 잘못되었다. Destination 0.0.0.0/0의 Gateway를 192.168.100.1로 변경하여야 한다.',
choice2:' Gateway 설정이 잘못되었다. 192.168.100.0의 Gateway를 192.168.1.1로 변경하여야 한다.',
choice3:' 인터페이스 설정이 잘못되었다. 192.168.100.0/24에 대해서는 eth0으로 설정하여야 한다.',
choice4:' Genmask가 잘못되었다. 192.168.100.0에 대해 0.0.0.0으로 설정하여야 한다.',
answer: '2',
		},
		{
question:'리눅스에서 시스템 로그인 기록을 확인하는 명령어는?',
choice1:' dmesg',
choice2:' lastlogin',
choice3:' last',
choice4:' source',
answer: '3',
		},
		{
question:'네이버 클라우드 플랫폼 Load Balancer의 헬스체크에 대한 설명 중 잘못된 것은?',
choice1:' 헬스체크 주기는 Classic 환경에서는 6초 간격이며, VPC환경에서는 디폴트 30초이다.',
choice2:' 5번 응답이 없는 경우 unbind한다',
choice3:' Unbind됐던 서버가 헬스체크 응답이 3번 성공하면 Bind된다.',
choice4:' VPC환경에서는 헬스체크 주기를 Target Group에서 변경할 수 있다.',
answer: '2',
		},
		{
question:'CPU, Memory, DISK I/O 사용량 등 시스템 전반에 걸친 시스템 성능지표를 수집, 레포트하고 저장하는 명령어는?',
choice1:' nmap',
choice2:' vmstat',
choice3:' sar ',
choice4:' iostat',
answer: '3',
		},
		{
question:'Linux서버에서 iptables로 정책이 설정되어 있다. 설정된 정책을 삭제하기 위한 적절한 명령어는?',
choice1:' iptables –A',
choice2:' iptables –F',
choice3:' iptables –G',
choice4:' iptables –W',
answer: '2',
		},
		{
question:'일반적으로 DNS 쿼리에 대해 캐싱을 하여 이후 쿼리에 대해 빠르게 응답할 수 있도록 로컬호스트에도 DNS 캐싱을 하게 되는데 DNS 캐싱을 하기 때문에 DNS가 변경된 경우에 잘못된 목적지를 찾아가게 되는 경우가 있다. 때문에 DNS캐시를 Flush하여야 하는데 Windows 서버에서 DNS를 Flush하기 위한 명령어는 무엇인가?',
choice1:' network restart',
choice2:' ipconfig / flushdns',
choice3:' dns-clean',
choice4:' mdc restart',
answer: '2',
		},
		{
question:'네이버클라우드 플랫폼에서 제공되는 웹 성능 측정 도구는 무엇인가?',
choice1:' AB',
choice2:' ngrinder ',
choice3:' topaz ',
choice4:' loadrunner',
answer: '2',
		},
		{
question:'도메인에 맵핑된 IP를 확인할 수 있는 명령어를 고르시오.',
choice1:' whois',
choice2:' nslookup',
choice3:' ipconfig',
choice4:' who',
answer: '2',
		},
		{
question:'아파치 웹서버 성능측정 툴인 ab의 여러 옵션들 중 프록시 서버를 사용해 요청할 수 있는 옵션은? ',
choice1:' n',
choice2:' x',
choice3:' g',
choice4:' t',
answer: '2',
		},
		{
question:'네이버 클라우드 플랫폼의 DNS에서 레코드 값을 바꾸었으나 반영이 되지 않는다면 어떤 설정을 의심해야 하는가?',
choice1:' 레코드 타입',
choice2:' TTL',
choice3:' 레코드값',
choice4:' 레코드명',
answer: '2',
		},
		{
question:'SSL VPN에 접속하여 Management Console을 이용하여 서버를 새로 생성하고 생성된 서버는 기존에 SSL VPN 접속이 가능한 ACG에 속하도록 하여 생성했는데 새로 생성한 서버만 접근이 되지 않는다. 원인과 해결 방법은 무엇인가?',
choice1:' SSLVPN 캐시 문제로 SSL VPN을 재접속한다.',
choice2:' 웹 브라우저 캐시 문제로 웹 브라우저를 재시작한다.',
choice3:' SSL VPN 라우팅 문제로 SSL VPN을 재접속 한다.',
choice4:' ACG에서 SSL VPN 대역이 포함되어 있지 않아서 발생한 문제로 ACG에 SSL VPN 대역을 추가한다.',
answer: '4',
		},
		{
question:'웹서비스 성능을 측정할 수 있는 툴로 적합하지 않는 것을 고르시오',
choice1:' ngrinder',
choice2:' Percona TPCC',
choice3:' ab',
choice4:' Web service Monitoring System',
answer: '2',
		},
		{
question:'syslogd에 대한 설명으로 틀린것은?',
choice1:' 로그를 수집하는 데몬',
choice2:' UDP프로토콜의 514번 포트를 사용한다.',
choice3:' 클라이언트는 클라이언트 프로그램을 이용하여야 한다.',
choice4:' 기본적으로 /var/log/messages에 로그를 기록한다.',
answer: '3',
		},
		{
question:'SSH에서 root 원격 접속을 막고자 할 때 사용하는 옵션은?',
choice1:' AllowRootLogin NO',
choice2:' DenyRootLogin YES',
choice3:' PermitRootLogin YES',
choice4:' PermitRootLogin NO',
answer: '4',
		},
		{
question:'java 분산서비스 및 시스템의 지속적인 성능분석을 제공하여, 오류발생 가능성에 대한 진단과 추적을 지원하는 플랫폼 서비스 상품의 이름은?',
choice1:' Pinpoint',
choice2:' API Gateway',
choice3:' SENS',
choice4:' WMS',
answer: '1',
		},
		{
question:'다음 명령어 중 목적이 다른 하나는?',
choice1:' top',
choice2:' ps',
choice3:' sar',
choice4:' proc',
answer: '4',
		},
		{
question:'WWW. ncloud.com 은 Apache를 사용하고 있다. http://www.ncloud.com 을 웹 브라우저에서 접근하면 index.php를 기본으로 보여주고자 할 때 어느 부분을 변경하여야 하는가?',
choice1:' DocumentRoot',
choice2:' Include',
choice3:' AccessConfig',
choice4:' Directorylndex Paas',
answer: '4',
		},
		{
question:'Linux 서버에서 iptables로 정책이 설정되어 있다. 어떤 정책이 설정되어 있는지 확인하고자 하는 경우 적합한 명령어는 무엇인가?',
choice1:' iptables -A',
choice2:' iptables -T',
choice3:' iptables -L',
choice4:' iptables –N',
answer: '3',
		},
		{
question:'MySQL 성능측정 도구가 아닌것은?',
choice1:' Percona TPCC',
choice2:' workbench',
choice3:' Apache Jmeter',
choice4:' sysbench',
answer: '2',
		},
		{
question:'Windows Server를 이미지로 만든 다음 해당 이미지를 이용해서 서버를 생성하였을 때 다음과 같은 메시지가 출력되었다.원인과 해결 방법은 무엇인가?',
choice1:' 파일시스템에 문제가 발생한 것으로 파일시스템 복구를 시도한다.',
choice2:' SID 값이 중복되어 발생한 것으로Sysprep을 통해 새로운 SID로 변경한다.',
choice3:' 동일한 컴퓨터 이름이 동일네트워크상에 있어서 발생한 것으로 컴퓨터 이름을 변경한다.',
choice4:' 커널 오류로 재설치 하여야 한다.',
answer: '2',
		},
		{
question:'실 서비스 투입 전 리얼환경과 유사환경 구현 후 서버가 수용할 수 있는 사용자(vuser)를 확인할 수 있는 부하테스트를 위한 툴 이름을 고르시오.',
choice1:' ab',
choice2:' nGrinder',
choice3:' Pinpoint',
choice4:' Web Service Monitoring System(WMS)',
answer: '2',
		},
		{
question:'서버의 CPU가 100%를 사용하면서 서비스가 정상적이지 못하다. 어떤 파일이 100%를 사용하는지 확인하기 위한 리눅스 명령어는 무엇인가?',
choice1:' Is',
choice2:' top',
choice3:' proc',
choice4:' lsof',
answer: '2',
		},
		{
question:'리눅스 서버를 운영중에 동접이2000 정도에서 더이상 새로운 접속을 맺을 수 없는 현상을 발견하였다. 어느 부분을 의심하여야 할까?',
choice1:' ACG',
choice2:' /etc/sysctl.conf 파일에서 최대 오픈 파일 수 확인',
choice3:' /etc/sysctl.conf 파일에서 최대 접속 가능 범위확인',
choice4:' Apache의 MAX Client 확인',
answer: '4',
		},
		{
question:'현재 서버에 연결된 커넥션의 갯수를 확인할 수 있는 명령어는?',
choice1:' netstat',
choice2:' tcpdump',
choice3:' ethtool',
choice4:' route',
answer: '1',
		},
		{
question:'다음중 성격이 다른 서비스는?',
choice1:' sftp',
choice2:'samba',
choice3:' nfs',
choice4:' gopher',
answer: '4',
		},
		{
question:'윈도우 서버의 Process Crash, Memory Leak패턴을 확인하는 디버그 도구는 무엇인가?',
choice1:' Debug',
choice2:' PAL(Performance Analysis of Logs Tool)',
choice3:' xPerf',
choice4:' Message Analyzer',
answer: '1',
		},
		{
question:'NCP에 구성한 웹사이트의 지연이 발생하고 있는 상황에서 해당 원인을 파악하기 위해 사용 가능한 NCP 상품으로 적절한 것은?',
choice1:' Web Service Monitoring System',
choice2:' Cloud Log Analytics',
choice3:' nGrinder',
choice4:' Network Traffic Monitoring',
answer: '4',
		},
		{
question:'리눅스 서버를 운영 중 Too many Open files라는 에러가 발생하였습니다. 이 때 변경이 필요한 설정 파일은?',
choice1:' syslog.conf',
choice2:' mailx.conf',
choice3:' sysctl.conf',
choice4:' session.conf',
answer: '3',
		},
		{
question:'여러명의 사람들이 공통의 네이버 클라우드 플랫폼 인프라 환경을 이용하고 있다. 누군가 실수로 운영중인 서버를 반납하였다. 다음과 같은 사태를 막고자 할 때 사용 할 수 있는 방법은?',
choice1:' 중요 서버들은 서버관리 및 설정변경에서 반납보호를 설정한다.',
choice2:' 실수한 사람을 문책한다.',
choice3:' 서버 이름에 반납 금지를 표기한다.',
choice4:' Resource Manager어|서 중요 서버를 설정한다.',
answer: '1',
		},
		{
question:'Linux에서 볼륨의 UUID를 확인하는 명령어는 무엇인가요?',
choice1:' uuid',
choice2:' lsuuid',
choice3:' blkid',
choice4:' df',
answer: '3',
		},
		{
question:'서버생성 시, init scrip를 적용하였으나 제대로 반영이 되지 않은 것 같은 경우 init script에 대한 로그를 확인할 수 있는 경로로 알맞은 것은? (리눅스 기준)',
choice1:' /var/log/ncloud.log',
choice2:' /var/log/ncloud/init.log',
choice3:' /var/log/ncloud/initscript.log',
choice4:' /var/log/ncloud-init.log',
answer: '4',
		},
		{
question:'리눅스 서버에서 서버의 자체 네트워크에 문제가 없는 것을 확인하려 합니다. 스스로에게 5번 ping을 날리고자 할 때 올바른 명령어는?',
choice1:' ping -n 5 localhost',
choice2:' ping -c 5 localhost',
choice3:' ping -I localhost',
choice4:' ping -t 5 localhost',
answer: '2',
		},
		{
question:'기존 UUID에서 새로운 UUID로 변경하기 위한 명령어는 무엇인가요?',
choice1:' update',
choice2:' updateuuid',
choice3:' tune2fs',
choice4:' fdisk',
answer: '3',
		},
		{
question:'Linux 서버에서 일반적인 시스템 로그를 저장하는 로그파일은 무엇인가요?',
choice1:' /var/log/messages',
choice2:' /var/log /wtmp',
choice3:' /var/log/dmesg',
choice4:' /var/log/secure',
answer: '1',
		},
		{
question:'Linux 서버에서 외부에서의 접근 시도에 대한 로그를 저장하는 로그파일은 무엇인가요?',
choice1:' /var/log/messages',
choice2:' /var/log/wtmp',
choice3:' /var/log/access',
choice4:' /var/log/secure',
answer: '4',
		},
		{
question:'새로운 UUID를 적용하기 위해 UUID를 생성해야 합니다. 새로운 UUID를 생성하기 위한 명령어는 무엇인가요?',
choice1:' uuid',
choice2:' blkid',
choice3:' uuidgen',
choice4:' makeuuid',
answer: '3',
		},
		{
question:'리눅스 서버에서 이전에 발생한 리소스 관련 로그를 확인하고자 합니다. 가능한 모든 정보를 확인하고자 할 경우, 다음 중 가장 올바른 명령어는?',
choice1:' sar –I',
choice2:' sar –a',
choice3:' sar –A',
choice4:' sar -L',
answer: '3',
		},
		{
question:'HTTP 상태 코드 중 연결이 잘못 된 것은?',
choice1:' 200 - 서버가 요청을 제대로 처리',
choice2:' 300 - 서버가 GET 요정의 일부만 성공적으로 처리했다.',
choice3:' 404 - 서버가 요정한 페이지(Resource)를 찾을 수 없다.',
choice4:' 500 – 서버에 오류가 발생하여 요청을 수행할 수 없다.',
answer: '2',
		},
		{
question:'www.ncloud.com은 Apache를 사용하고 있다. http://www.ncloud.com을 웹브라우저에서 접근하면 index.php를 기본적으로 보여주고자 할 때 어느부분을 변경하여야 할까?',
choice1:' DocumentRoot',
choice2:' Include',
choice3:' AccessConfig',
choice4:' Directoryindex',
answer: '4',
		},
		{
question:'VPC 플랫폼에서 Application Load Balancer를 이용중입니다. ALB에 들어오는 액세스 로그정보를 수집하고자 할 때 가장 올바른 액션은? (확인 요망)',
choice1:' Load Balancer에서 액세스 로그 수집설정을 활성화 한다.',
choice2:' 서버에서 Application Load Balancer로그를 수집하도록 설정을 변경한다.',
choice3:' ALB의 액세스 로그는 수집이불가능하다.',
choice4:' Target Group에서 액세스 로그수집 설정을 활성화 한다.',
answer: '1',
		},
		{
question:'다음 명령어 중 성격이 다른 3개와 다른 명령어는 무엇인가요?',
choice1:' sar',
choice2:' ps',
choice3:' top',
choice4:' tcpdump',
answer: '4',
		},
		{
question:'김초록씨는 회사에서 SSH Tool을 통해 VPC 플랫폼에 생성된 서버에 접속하려고 하나 접속이 잘 되고 있지 않습니다. 김초록씨에게 해줄 수 있는 조언으로 올바르지 않은 것은?',
choice1:' ACG에 Rule이 하나도 없네요. 허용정책을 넣어주세요!',
choice2:' NACL에 전체대역 거부정책이 우선순위1로 들어가 있네요! 허용정책을 우선순위 2로 넣어주세요!',
choice3:' 서버에 방화벽이 올라와 있진 않은지 서버접속 콘솔기능을 통해 확인해보세요!',
choice4:' 서버에 공인 IP가 부착되어 있나요?',
answer: '2',
		},
		{
question:'김초록씨는 Sub Account 상품을 통해 여러 사람들과 같은 인프라 환경을 운영중입니다. 상부에서 사용되지 않는 리소스는 없는지 조사하라는 지시가 내려왔습니다. 가장 적절한 액션으로 올바른 것은?',
choice1:' 힘을합쳐 여렷이서 모든 상품 댐을 눌러 조사한다.',
choice2:' Resource 상품을 통해 사용하고 있는 전체 리소스를 확인한다.',
choice3:' 리소스를 몇 개 삭제하고 끝낸다.',
choice4:' Cloud Advisor 상품을 통해 사용하고 있는 전체 리소스를 확인한다.',
answer: '4',
		},
		{
question:'네이버 클라우드 플랫폼 리눅스 서버에 부착한 추가 스토리지의 용량이 점점 부족해지고 있습니다. 현재 할당된 용량은 500GB이며, 500GB를 추가로 부착하려 합니다. 다음 중 가장 올바른 액션은 무엇인가요?',
choice1:' 추가 스토리지를 하나 더 장착하고, 기존 스토리지와 LVM으로 볼륨을 묶습니다.',
choice2:' 서버에 스토리지가 부착된 상태에서 기존 부착된 스토리지 볼륨 용량을 1000GB로 증설합니다.',
choice3:' 서버에 스토리지를 탈착한 상태에서 기존스토리지 볼륨용량을 1000GB로 증설합니다.',
choice4:' 서버 스토리지는 한 번 생성된 이후 증설이 불가능 합니다.',
answer: '2',
		},
		{
question:'Windows 클라이언트에서 DNS 캐시된 정보를 삭제하고자 할 때 사용하는 명령어는?',
choice1:' mdc flush',
choice2:' ndc flush',
choice3:' ipconfig/flushdns',
choice4:' netsh flushdns',
answer: '3',
		},
		{
question:'nscd에 대한 설명으로 옳은 것은?',
choice1:' 네임 서비스를 제공하기 위한 서버 데몬',
choice2:' 네임 서비스를 이용하기 위한 클라이언트',
choice3:' 네임 서비스를 캐싱하기 위한 데몬',
choice4:' 네임 서비스를 분석하는 데몬',
answer: '3',
		},
		{
question:'리눅스와 윈도우 서버간 NAS 스토리지를 공유하기 위한 방법은?',
choice1:' NAS AGL 에 윈도우 서버 추가',
choice2:' Samba를 설치하여 리눅스서버와 윈도우서버간 NAS가 공유될 수 있도록 설정',
choice3:' 네이버 클라우드 플랫폼의 리눅스 서버와 윈도우 서버간 NAS 스토리지는 공유 불가능하다.',
choice4:' NAS 스토리지 생성시, 윈도우 서버와 리눅스 서버간 공유가 가능한 옵선을 선택해준다.',
answer: '2',
		},
		{
question:'네이버 클라우드 플랫폼 Classic 환경에 존재하는 서버의 10.x.x.x 사설 IP 대역 NIC에 두개 이상의 IP를 부여하였을 때 발생할 수 있는 상황은?',
choice1:' 기존 IP로는 통신이 되나 추가된 IP로 통신이 되지 않는다.',
choice2:' 추가된 IP 뿐만 아니라 기존 IP도 통신이 되지 않는다',
choice3:' 서버가 강제 정지된다.',
choice4:' 기존 IP는 통신이 안되고 추가된 IP로만 통신이 된다',
answer: '2',
		},
		{
question:'동일한 VPC내의 각기 다른 ACG와 NIC가 매핑되어 있는 서버 두 대가 동작하고 있습니다. 두 서버 간 ping이 가능하게 하기 위해 해야하는 작업은?',
choice1:' 각 ACG에 ICMP 프로토콜 허용 rule 추가',
choice2:' 각 ACG 에 TCP 프로토콜 허용 rule 추가',
choice3:' 각 ACG에 UDP 프로토콜 허용 rule 추가',
choice4:' 각 ACG에 IGMP 프로토콜 허용 rule 추가',
answer: '1',
		},
		{
question:'VPC 플랫폼 환경에 있는 서버 장애알람을 받기 위한 세팅이 필요합니다. 이 때 사용해야하는 상품으로 가장 적절한 것은?',
choice1:' Cloud Insight',
choice2:' Cloud Search',
choice3:' Cloud Detector',
choice4:' Cloud Checker',
answer: '1',
		},
		{
question:'SSL VPN에 접속하여 Management Console을 이용하여 서버를 새로 생성하고 생성된 서버는 기존에 SSL VPN 접속이 가능한 ACG에 속하도록 하여 생성했는데 새로 생성한 서버만 접근이 되지 않는다. 원인과 해결 방법은 무엇인가?',
choice1:' SSL VPN 캐시 문제로 SSL VPN을 재접속한다.',
choice2:' 웹브라우저 캐시 문제로 웹 브라우저를 재시작한다',
choice3:' SSL VPN 라우팅 문제로 SSL VPN을 재접속 한다.',
choice4:' ACG에서 SSL VPN 대역이 포함되어 있지 않아서 발생한 문제로 ACG에 SSL VPN대역을 추가한다.',
answer: '4',
		},
		{
question:'Live Station 상품을 이용하여 주기적으로 실시간 방송을 운영중입니다. 송출에 문제는 없는지 확인하려 합니다. 이 때 가장 올바른 방법은? (확인 요망)',
choice1:' 매번 실시간으로 모니터링 한다.',
choice2:' Notification Setting에서 송출실패 에러 알람을 설정하고, 담당자에게 SMS/Email을발송하도록 한다.',
choice3:' Live Management 상품을 이용하여 모니터링 한다.',
choice4:' Cloud Search에서 송출실패 에러 알람을 설정하고, 담당자에게 SMS/Email을 발송하도록 한다.',
answer: '2',
		},
		{
question:'윈도우 서버의 Process Crash, Memory Leak패턴을 확인하는 디버그 도구는 무엇인가?',
choice1:' Debug Diag',
choice2:' PAL(Performance Analysis of Logs Tool)',
choice3:' xPref',
choice4:' Message Analyzer',
answer: '1',
		},
		{
question:'다음 프로그램 중 성격이 다른 프로그램은?',
choice1:' tcpump',
choice2:' network monitor',
choice3:' nmap',
choice4:' wireshark',
answer: '1',
		},
		{
question:'로그에 대하여 정해진 처리방식으로 삭제하거나 파일을 바꿔줌으로써, 시스템 성능을 높이는 역할을 수행하는 것은?',
choice1:' logtemp',
choice2:' logarchive',
choice3:' logrefresh',
choice4:' logrotate',
answer: '4',
		},
		{
question:'리눅스 OS에서 일반적인 시스템 로그는 어느 경로에 저장되는가?',
choice1:' /log',
choice2:' /var/log',
choice3:' /sys/ log',
choice4:' /var/log/httpd',
answer: '2',
		},
		{
question:'다음 중 NMAP어 대한 설명 중 잘못된 것은?',
choice1:' 포트 스캔용 툴이다.',
choice2:' 오픈되어 있는 포트에 대해 스캔을 수행한다.',
choice3:' 방화벽으로 보호되는 호스트에 대해서는 스캔이 불가능하다.',
choice4:' 리눅스 버전과 윈도우 버전이 제공된다.',
answer: '3',
		},
		{
question:'Classic 플랫폼을 사용중입니다. SSL VPN 상품을 신청 후, 네이버 클라우드 플랫폼 서버에 접속을 시도 시 접속이 되지 않습니다. 어떤 부분을 확인해야 하나요?',
choice1:' NACL',
choice2:' ACG',
choice3:' Subnet',
choice4:' Public IP',
answer: '2',
		},
		{
question:'김초록씨는 네이버 클라우드 플랫폼에서 여러 대의 SSD 서버를 운영중입니다, 상부에서 서버 운영 비용을 절감할 수 있는 대안을 제시하라는 지시가 내려왔습니다. 이 때 성능이 저하되어서는 안됩니다. 가장 올바른 방법은 무엇인가요?',
choice1:' 사용하고 있는 스토리지 종류는 HDD로 변경한다',
choice2:' Auto Scaling을 통해 트래픽에 따라 서버가 자동으로 증감하도록 구조를 변경한다.',
choice3:' 운영중인 서버 스펙을 한 단계 낮준다',
choice4:' 서버를 몇 대 지워 눈속임 한다.',
answer: '2',
		},
		{
question:'리눅스 서버를 사용하던 중 사용중인 파일 리스트를 확인하고 싶어졌습니다. lsof 명령어를 통해 확인하고자 하는데, 옵션값에 대한 설명을 보고싶을 경우 사용할 수 있는 명령어는?',
choice1:' lsof –P',
choice2:' lsof –n',
choice3:' lsof –w',
choice4:' lsof -h',
answer: '4',
		},
		{
question:'Classic 플랫폼에서 서버 상품을 이용중 입니다. 서버에 IP를 하나 더 부여해야 하는 상황이 되었습니다. 이 때 올바른 사용방법은 무엇인가요?',
choice1:' Private Subnet을 생성한 후 Network Interface를 부착한다',
choice2:' Network Interface를 단독 생성하여 부착한다',
choice3:' 기존 사용하던 Network Interface에 Secondary IP를 추가한다',
choice4:' 서버IP를 추가 부여하는 것이 불가능하다',
answer: '3',
		},
		{
question:'김초록씨는 Cloud DB for MySQL 상품을 이용중입니다. 상부에서 고가용성 테스트를 지시하였습니다. 이 때 김초록씨가 해야하는 액션으로 가장 적절한 것은 무엇인가요?',
choice1:' Master 서버에 고의 장애를 발생시킨다',
choice2:' Slave 서버에 고의 장애를 발생시킨다',
choice3:' 할 수 있는 방법이 없다',
choice4:' DB 관리에서 Master DB Fail Over 기능을 작동시킨다',
answer: '4',
		},
		{
question:'OS영역의 스토리지를 스냅샷을 통해 새로운 스토리지로 생성하여 스토리지에 할당했을 경우 발생할 수 있는 현상은? (리눅스 서버일 경우)',
choice1:' 아무 문제 없다',
choice2:' OS영역의 스토리지에 대해서는 스냅샷 생성이 불가능하다',
choice3:' Linux(CentOS, Ubuntu) 서버가 추가스토리지를 부팅용 스토리지로 오인하는 현상이 발생한다',
choice4:' OS영역의 스토리지에 대한 스냅샷 생성은 가능하다, 해당 스냅샷을 기반으로 한 스토리지 생성이 불가능 하다.',
answer: '3',
		},
		{
question:'윈도우 서버에서 로그인한 내역을 확인하기 위한 위치로 올바른 것은?',
choice1:' 이벤트 뷰어 > Windows 로그 > 보안 ',
choice2:' 이벤트 뷰어 > Windows로그 > 시스템',
choice3:' 이벤트 뷰어 > Windows로그 > Setup',
choice4:' 이벤트 뷰어 > Windows로그 > Forwarded Event',
answer: '1',
		},
		{
question:'CentOS 6.x 이상에서는 스토리지 식별을 무엇으로 하나요?',
choice1:' 라벨',
choice2:' UUID',
choice3:' 파티션 번호',
choice4:' 드라이브명',
answer: '2',
		},
		{
question:'Classic 플랫폼을 사용중입니다. SSL VPN 상품을 신청 후, 네이버 클라우드 플랫폼 서버에 접속을 시도 시 접속이 되지 않습니다. 어떤 부분을 확인해야 하나요?',
choice1:' NACL',
choice2:' ACG',
choice3:' Subnet',
choice4:' Public IP',
answer: '2',
		},
		{
question:'윈도우 서버에서 syslog 역할을 수행하는 것은?',
choice1:' sar',
choice2:' netmon',
choice3:' event viewer',
choice4:' 성능 모니터',
answer: '3',
		},
		{
question:'Linux 서버에서 시스템 부팅 메시지를 저장하는 로그파일은 무엇인가요?',
choice1:' /var/log/dmesg',
choice2:' /var/log/wtmp',
choice3:' /var/log/access',
choice4:' /var/log/secure',
answer: '2',
		},
		{
question:'Linux 서버의 SSH에서 root로의 접근을 막고자 할 때 변경해야 하는 설정내용은 무엇인가요?',
choice1:' UsePAM',
choice2:' PermitRootLogin',
choice3:' ChrootDirectory',
choice4:' PermitTunnel',
answer: '2',
		},
		{
question:'다음 중, Cloud DB for MS-SQl의 백업에 대한 설명 중 옳은 것은?',
choice1:' DB백업파일 보관기간은 최소 1일에서 최대 20일까지 선택할 수 있습니다',
choice2:' DB 백업파일은 별도의 스토리지에 보관되며, 보관 비용은 Cloud DB for MS-SQL 사용 요금에 포함되어 있습니다.',
choice3:' 백업 시간은 사용자 정의 선택시 15분 단위로 선택이 가능합니다.',
choice4:' 백업 시간으로 자동을 선택하게 되면, 매번 임의의 시간에 백업이 진행됩니다.',
answer: '1',
		},
		{
question:'다음 중, Cloud Activity Tracer에 대한 설명 중 잘못된 것은?',
choice1:' Console 활동에 대한 로그만 수집이 가능하다',
choice2:' Cloud Log Analytics와도 연계가되어 계정 활동 로그 수집 및 분석이 가능하다',
choice3:' 메인 계정 뿐만 아니라 서브계정에 대한 활동 로그도 수집한다',
choice4:' Cloud Activity Tracer 페이지 자체적으로 검색 및 필터링 기능을 제공한다',
answer: '1',
		}
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 60

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++;
    progressText.innerText = `진행도 ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion ['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
