import socket

target = input('Enter target Ipaddress:')
open_ports = []
ports = []


print('SELECT SCAN TYPE')
print("1. Single port")
print("2. Port range (e.g., 20-100)")
print("3. Specific ports (e.g., 22,80,443)")
print("4. Common ports (1-1000)")
print("5. All ports (1-65535)")

choice = input('choose (1-6): ')
if choice == '1':
    ports = int(input('Enter port'))
elif choice == '2':
    start =int( input('Enter start port: '))
    end = int(input('Enter end port: '))
    ports = range(start, end + 1)
elif choice == '3':
    ports_input = input('Enter ports (comma-separated): ')
    ports = [int(p.strip()) for p in ports_input.split(',')]
elif choice == '4':
    ports = range(1,1001)
elif choice == '5':
    ports = range (1,65536)
else:
    print('invalid choice')
    exit()

def scan_port(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)
    result = s.connect_ex((target, port))
    if result == 0:
        open_ports.append(port)
    s.close()

for port in ports:
    scan_port(port)

if open_ports:
    print (F'Ports {open_ports} found on {target}')
else:
    print(F'No port was found open on the {target}')
